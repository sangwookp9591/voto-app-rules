import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

const CATEGORY_LIMIT: Record<string, number> = {
    LOL: 5,
    BATTLEGROUNDS: 4,
    VALORANT: 5,
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url!);
    const id = searchParams.get('id');
    if (id) {
        const team = await prisma.team.findUnique({
            where: { id },
            include: { members: { include: { user: true } }, invites: true },
        });
        return NextResponse.json(team);
    }
    const teams = await prisma.team.findMany({
        include: {
            members: { include: { user: true } },
            invites: true,
        },
    });
    return NextResponse.json(teams);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const { name, category, memberIds } = await req.json();
    if (!CATEGORY_LIMIT[category] || memberIds.length > CATEGORY_LIMIT[category]) {
        return NextResponse.json({ error: '카테고리별 인원수 초과' }, { status: 400 });
    }
    // 팀 생성 및 팀장(생성자) 자동 추가
    const team = await prisma.team.create({
        data: {
            name,
            category,
            leaderId: user.id,
            members: {
                create: [
                    { userId: user.id },
                    ...memberIds.filter((id: string) => id !== user.id).map((id: string) => ({ userId: id })),
                ],
            },
        },
        include: { members: true },
    });
    return NextResponse.json(team);
}

// 팀 정보 수정, 팀원 추가/삭제 (PUT)
export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const { teamId, name, category, addMemberId, removeMemberId } = await req.json();
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team || team.leaderId !== user.id) {
        return NextResponse.json({ error: '팀장만 수정 가능' }, { status: 403 });
    }
    // 팀 정보 수정
    if (name || category) {
        await prisma.team.update({ where: { id: teamId }, data: { name, category } });
    }
    // 팀원 추가
    if (addMemberId) {
        await prisma.teamMember.create({ data: { teamId, userId: addMemberId } });
    }
    // 팀원 삭제
    if (removeMemberId) {
        await prisma.teamMember.deleteMany({ where: { teamId, userId: removeMemberId } });
    }
    return NextResponse.json({ ok: true });
}

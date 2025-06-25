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

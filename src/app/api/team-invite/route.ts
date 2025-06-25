import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const invites = await prisma.teamInvite.findMany({
        where: { userId: user.id },
        include: { team: true },
    });
    return NextResponse.json(invites);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const { teamId, inviteUserId } = await req.json();
    const invite = await prisma.teamInvite.create({
        data: {
            teamId,
            userId: inviteUserId,
            status: 'pending',
        },
    });
    return NextResponse.json(invite);
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const { inviteId, status } = await req.json();
    if (!['accepted', 'rejected'].includes(status)) {
        return NextResponse.json({ error: '잘못된 상태' }, { status: 400 });
    }
    const invite = await prisma.teamInvite.update({
        where: { id: inviteId, userId: user.id },
        data: { status, respondedAt: new Date() },
    });
    // accepted면 TeamMember로 추가
    if (status === 'accepted') {
        await prisma.teamMember.create({ data: { teamId: invite.teamId, userId: user.id } });
    }
    return NextResponse.json(invite);
}

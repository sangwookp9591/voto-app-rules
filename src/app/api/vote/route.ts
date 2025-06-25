import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    // 후보별 득표수 집계
    const results = await prisma.candidate.findMany({
        include: {
            _count: { select: { votes: true } },
        },
    });
    return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const { candidateId } = await req.json();
    // 중복투표 방지는 추후 추가
    const vote = await prisma.vote.create({
        data: {
            user: { connect: { email: session.user.email } },
            candidate: { connect: { id: candidateId } },
        },
    });
    return NextResponse.json(vote);
}

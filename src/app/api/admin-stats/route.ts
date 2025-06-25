import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export async function GET() {
    const today = dayjs().startOf('day').toDate();
    const [voteCount, teamCount, userCount, todayVote, todayTeam, todayUser] = await Promise.all([
        prisma.vote.count(),
        prisma.team.count(),
        prisma.user.count(),
        prisma.vote.count({ where: { createdAt: { gte: today } } }),
        prisma.team.count({ where: { createdAt: { gte: today } } }),
        prisma.user.count({ where: { createdAt: { gte: today } } }),
    ]);
    return NextResponse.json({ voteCount, teamCount, userCount, todayVote, todayTeam, todayUser });
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export async function GET() {
    const days = Array.from({ length: 7 }).map((_, i) => dayjs().subtract(i, 'day').startOf('day'));
    const stats = await Promise.all(
        days.map(async (d) => {
            const count = await prisma.log.count({
                where: {
                    action: 'vote_attempt_duplicate',
                    createdAt: { gte: d.toDate(), lt: d.add(1, 'day').toDate() },
                },
            });
            return { date: d.format('YYYY-MM-DD'), count };
        })
    );
    return NextResponse.json(stats.reverse());
}

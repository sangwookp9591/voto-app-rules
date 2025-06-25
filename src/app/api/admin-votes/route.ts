import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const votes = await prisma.vote.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
            user: true,
            candidate: true,
        },
    });
    return NextResponse.json(votes);
}

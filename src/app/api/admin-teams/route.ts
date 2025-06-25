import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const teams = await prisma.team.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
            leader: true,
            members: true,
        },
    });
    return NextResponse.json(teams);
}

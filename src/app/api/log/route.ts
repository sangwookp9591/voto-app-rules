import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url!);
    const action = searchParams.get('action');
    const where = action ? { action } : {};
    const logs = await prisma.log.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { user: true },
    });
    return NextResponse.json(logs);
}

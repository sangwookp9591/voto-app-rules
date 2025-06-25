import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
    });
    return NextResponse.json(users);
}

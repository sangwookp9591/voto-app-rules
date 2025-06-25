import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url!);
    const query = searchParams.get('query') || '';
    if (!query) return NextResponse.json([]);
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { nickname: { contains: query } },
                { name: { contains: query } },
                { email: { contains: query } },
                { userProfiles: { some: { gameId: { contains: query } } } },
            ],
            userProfiles: { some: {} }, // 게임 프로필이 등록된 유저만
        },
        take: 10,
    });
    return NextResponse.json(users);
}

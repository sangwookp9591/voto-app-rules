import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const profile = await prisma.userProfile.findUnique({ where: { userId: user.id } });
    return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: '로그인 필요' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 404 });
    const data = await req.json();
    const profile = await prisma.userProfile.upsert({
        where: { userId: user.id },
        update: data,
        create: { ...data, userId: user.id },
    });
    return NextResponse.json(profile);
}

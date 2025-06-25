import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url!);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (!type || !id) return NextResponse.json({ error: 'type, id 필요' }, { status: 400 });
    if (type === 'vote') await prisma.vote.delete({ where: { id } });
    else if (type === 'team') await prisma.team.delete({ where: { id } });
    else if (type === 'user') await prisma.user.delete({ where: { id } });
    else return NextResponse.json({ error: '지원하지 않는 타입' }, { status: 400 });
    return NextResponse.json({ ok: true });
}

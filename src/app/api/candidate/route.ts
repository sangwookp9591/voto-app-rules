import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const candidates = await prisma.candidate.findMany();
    return NextResponse.json(candidates);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const candidate = await prisma.candidate.create({ data });
    return NextResponse.json(candidate);
}

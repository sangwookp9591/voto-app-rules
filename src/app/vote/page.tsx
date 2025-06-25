'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const VoteForm = dynamic(() => import('@/features/vote/ui/VoteForm'), { ssr: false });

export default function VotePage() {
    const { data: session } = useSession();
    if (!session) {
        return (
            <main className="max-w-xl mx-auto py-8 px-4 text-center">
                <p className="mb-4">로그인 후 투표에 참여할 수 있습니다.</p>
                <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">
                    홈으로 이동
                </Link>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-soopbg flex flex-col items-center justify-center py-12 px-4">
            <h1 className="text-3xl font-bold text-soopgreen mb-8">팀 투표</h1>
            <VoteForm />
        </main>
    );
}

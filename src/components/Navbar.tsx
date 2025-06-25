'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <nav className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex gap-4">
                <Link href="/">홈</Link>
                <Link href="/vote">투표</Link>
                <Link href="/result">결과</Link>
            </div>
            <div>
                {session ? (
                    <div className="flex items-center gap-2">
                        <span>{session.user?.name || session.user?.email}</span>
                        <button onClick={() => signOut()} className="px-2 py-1 border rounded">
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button onClick={() => signIn()} className="px-2 py-1 border rounded">
                        로그인
                    </button>
                )}
            </div>
        </nav>
    );
}

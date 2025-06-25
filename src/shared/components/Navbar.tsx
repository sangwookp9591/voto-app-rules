'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav
            className="bg-white border-b border-soopborder shadow-card px-4 py-2 flex items-center justify-between sticky top-0 z-30"
            aria-label="메인 내비게이션"
        >
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-soopgreen"
                    aria-label="메뉴 열기"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span className="block w-6 h-0.5 bg-soopgreen mb-1"></span>
                    <span className="block w-6 h-0.5 bg-soopgreen mb-1"></span>
                    <span className="block w-6 h-0.5 bg-soopgreen"></span>
                </button>
                <div className={`flex-col md:flex-row md:flex gap-4 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Link
                        href="/"
                        className="hover:text-soopgreen focus:text-soopgreen focus:outline-none"
                        tabIndex={0}
                        aria-label="홈"
                    >
                        홈
                    </Link>
                    <Link
                        href="/vote"
                        className="hover:text-soopgreen focus:text-soopgreen focus:outline-none"
                        tabIndex={0}
                        aria-label="투표"
                    >
                        투표
                    </Link>
                    <Link
                        href="/result"
                        className="hover:text-soopgreen focus:text-soopgreen focus:outline-none"
                        tabIndex={0}
                        aria-label="결과"
                    >
                        결과
                    </Link>
                </div>
            </div>
            <div>
                {session ? (
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline" aria-label="유저 정보">
                            {session.user?.name || session.user?.email}
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="px-3 py-1 bg-soopgreen text-white rounded-btn shadow-btn font-semibold hover:bg-soopblue focus:outline-none focus:ring-2 focus:ring-soopgreen transition"
                            aria-label="로그아웃"
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-3 py-1 bg-soopblue text-white rounded-btn shadow-btn font-semibold hover:bg-soopgreen focus:outline-none focus:ring-2 focus:ring-soopgreen transition"
                        aria-label="로그인"
                    >
                        로그인
                    </button>
                )}
            </div>
        </nav>
    );
}

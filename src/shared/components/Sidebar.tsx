import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside
            className="hidden md:flex flex-col fixed top-0 left-0 h-full w-56 bg-white border-r border-soopborder shadow-card z-40 p-6 gap-6"
            aria-label="사이드바 내비게이션"
        >
            <nav className="flex flex-col gap-4">
                <Link
                    href="/"
                    className="font-bold text-soopgreen hover:text-soopblue focus:text-soopblue focus:outline-none"
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
                <Link
                    href="/admin"
                    className="hover:text-soopred focus:text-soopred focus:outline-none font-semibold"
                    tabIndex={0}
                    aria-label="관리자"
                >
                    관리자
                </Link>
            </nav>
            <div className="mt-auto text-xs text-sooptext/60">© 2024 Vote App</div>
        </aside>
    );
}

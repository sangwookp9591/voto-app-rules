import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
        <main className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">투표 참여</h1>
            <div className="mb-4">투표 마감: 2024-07-07 23:59</div>
            {/* 후보 리스트 (임시) */}
            <ul className="mb-6">
                <li className="flex items-center gap-4 mb-2 p-2 border rounded">
                    <img src="/public/globe.svg" alt="팀A" className="w-10 h-10" />
                    <span className="flex-1">팀A - 설명</span>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">선택</button>
                </li>
                <li className="flex items-center gap-4 mb-2 p-2 border rounded">
                    <img src="/public/window.svg" alt="팀B" className="w-10 h-10" />
                    <span className="flex-1">팀B - 설명</span>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">선택</button>
                </li>
            </ul>
            <div className="mb-4">
                내 투표: <span className="font-semibold">아직 없음</span>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">투표하기</button>
        </main>
    );
}

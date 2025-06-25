'use client';
import dynamic from 'next/dynamic';

const ResultChart = dynamic(() => import('@/features/result/ui/ResultChart'), { ssr: false });

export default function ResultPage() {
    return (
        <main className="min-h-screen bg-soopbg flex flex-col items-center justify-center py-12 px-4">
            <h1 className="text-3xl font-bold text-soopgreen mb-8">투표 결과</h1>
            <div className="bg-white rounded-card shadow-card p-8 border border-soopborder max-w-xl w-full">
                <div className="mb-4 text-sooptext">투표 종료: 2024-07-07 23:59</div>
                <ResultChart />
                <div className="text-red-600 font-semibold mt-8">투표가 종료되었습니다.</div>
            </div>
        </main>
    );
}

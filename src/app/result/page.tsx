import dynamic from 'next/dynamic';

const ResultChart = dynamic(() => import('@/features/result/ui/ResultChart'), { ssr: false });

export default function ResultPage() {
    return (
        <main className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">투표 결과</h1>
            <div className="mb-4">투표 종료: 2024-07-07 23:59</div>
            <ResultChart />
            <div className="text-red-600 font-semibold mt-8">투표가 종료되었습니다.</div>
        </main>
    );
}

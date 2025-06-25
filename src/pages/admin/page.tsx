import React from 'react';

export default function AdminPage() {
    return (
        <main className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
            <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">투표 관리</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded mb-2">투표 생성</button>
                <div className="border p-4 rounded mb-2">투표 리스트(수정/삭제)</div>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">투표 현황 모니터링</h2>
                <div className="border p-4 rounded">실시간 투표 현황</div>
            </section>
            <section>
                <h2 className="text-lg font-semibold mb-2">부정 투표 관리</h2>
                <div className="border p-4 rounded">부정 투표 내역</div>
            </section>
        </main>
    );
}

import React, { useEffect, useState } from 'react';

export default function AdminPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [filter, setFilter] = useState('');
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/log${filter ? `?action=${filter}` : ''}`)
            .then((res) => res.json())
            .then(setLogs);
    }, [filter]);

    useEffect(() => {
        fetch('/api/admin-stats')
            .then((res) => res.json())
            .then(setStats);
    }, []);

    return (
        <main className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
            {stats && (
                <section className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 border rounded bg-white shadow text-center">
                        <div className="text-sm text-gray-500">총 투표 수</div>
                        <div className="text-xl font-bold">{stats.voteCount}</div>
                    </div>
                    <div className="p-4 border rounded bg-white shadow text-center">
                        <div className="text-sm text-gray-500">총 팀 수</div>
                        <div className="text-xl font-bold">{stats.teamCount}</div>
                    </div>
                    <div className="p-4 border rounded bg-white shadow text-center">
                        <div className="text-sm text-gray-500">총 유저 수</div>
                        <div className="text-xl font-bold">{stats.userCount}</div>
                    </div>
                    <div className="p-4 border rounded bg-white shadow text-center col-span-2 sm:col-span-1">
                        <div className="text-sm text-gray-500">오늘 투표</div>
                        <div className="text-xl font-bold">{stats.todayVote}</div>
                    </div>
                    <div className="p-4 border rounded bg-white shadow text-center col-span-2 sm:col-span-1">
                        <div className="text-sm text-gray-500">오늘 팀 생성</div>
                        <div className="text-xl font-bold">{stats.todayTeam}</div>
                    </div>
                    <div className="p-4 border rounded bg-white shadow text-center col-span-2 sm:col-span-1">
                        <div className="text-sm text-gray-500">오늘 가입</div>
                        <div className="text-xl font-bold">{stats.todayUser}</div>
                    </div>
                </section>
            )}
            <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">로그/부정투표 내역</h2>
                <div className="mb-2">
                    <button
                        onClick={() => setFilter('')}
                        className={`mr-2 px-2 py-1 rounded ${!filter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setFilter('vote_attempt_duplicate')}
                        className={`px-2 py-1 rounded ${
                            filter === 'vote_attempt_duplicate' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        부정투표 시도
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-1">시간</th>
                                <th className="border px-2 py-1">유저</th>
                                <th className="border px-2 py-1">액션</th>
                                <th className="border px-2 py-1">IP</th>
                                <th className="border px-2 py-1">상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td className="border px-2 py-1">{new Date(log.createdAt).toLocaleString()}</td>
                                    <td className="border px-2 py-1">
                                        {log.user?.nickname || log.user?.name || log.user?.email || '-'}
                                    </td>
                                    <td className="border px-2 py-1">{log.action}</td>
                                    <td className="border px-2 py-1">{log.ip}</td>
                                    <td className="border px-2 py-1">{log.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
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

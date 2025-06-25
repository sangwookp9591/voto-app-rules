import React, { useEffect, useState } from 'react';

export default function AdminPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [filter, setFilter] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [tab, setTab] = useState('votes');
    const [votes, setVotes] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState('');

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

    useEffect(() => {
        if (tab === 'votes')
            fetch('/api/admin-votes')
                .then((res) => res.json())
                .then(setVotes);
        if (tab === 'teams')
            fetch('/api/admin-teams')
                .then((res) => res.json())
                .then(setTeams);
        if (tab === 'users')
            fetch('/api/admin-users')
                .then((res) => res.json())
                .then(setUsers);
    }, [tab]);

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
            <section className="mb-6">
                <div className="mb-2 flex gap-2">
                    <button
                        onClick={() => setTab('votes')}
                        className={`px-2 py-1 rounded ${tab === 'votes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        투표 내역
                    </button>
                    <button
                        onClick={() => setTab('teams')}
                        className={`px-2 py-1 rounded ${tab === 'teams' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        팀 목록
                    </button>
                    <button
                        onClick={() => setTab('users')}
                        className={`px-2 py-1 rounded ${tab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        유저 목록
                    </button>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="검색(이름/이메일/팀명 등)"
                        className="border rounded px-2 py-1 ml-2 flex-1"
                    />
                </div>
                {tab === 'votes' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 py-1">시간</th>
                                    <th className="border px-2 py-1">유저</th>
                                    <th className="border px-2 py-1">팀</th>
                                </tr>
                            </thead>
                            <tbody>
                                {votes
                                    .filter(
                                        (v) =>
                                            !search ||
                                            v.user?.name?.includes(search) ||
                                            v.user?.email?.includes(search) ||
                                            v.candidate?.name?.includes(search)
                                    )
                                    .map((v) => (
                                        <tr key={v.id}>
                                            <td className="border px-2 py-1">
                                                {new Date(v.createdAt).toLocaleString()}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {v.user?.nickname || v.user?.name || v.user?.email}
                                            </td>
                                            <td className="border px-2 py-1">{v.candidate?.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {tab === 'teams' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 py-1">팀명</th>
                                    <th className="border px-2 py-1">카테고리</th>
                                    <th className="border px-2 py-1">팀장</th>
                                    <th className="border px-2 py-1">인원</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams
                                    .filter(
                                        (t) => !search || t.name?.includes(search) || t.leader?.name?.includes(search)
                                    )
                                    .map((t) => (
                                        <tr key={t.id}>
                                            <td className="border px-2 py-1">{t.name}</td>
                                            <td className="border px-2 py-1">{t.category}</td>
                                            <td className="border px-2 py-1">
                                                {t.leader?.nickname || t.leader?.name || t.leader?.email}
                                            </td>
                                            <td className="border px-2 py-1">{t.members.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {tab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 py-1">이름/닉네임</th>
                                    <th className="border px-2 py-1">이메일</th>
                                    <th className="border px-2 py-1">가입일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter(
                                        (u) =>
                                            !search ||
                                            u.name?.includes(search) ||
                                            u.email?.includes(search) ||
                                            u.nickname?.includes(search)
                                    )
                                    .map((u) => (
                                        <tr key={u.id}>
                                            <td className="border px-2 py-1">{u.nickname || u.name}</td>
                                            <td className="border px-2 py-1">{u.email}</td>
                                            <td className="border px-2 py-1">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

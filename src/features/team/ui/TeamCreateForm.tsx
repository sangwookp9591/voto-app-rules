'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const GAMES = [
    { value: 'LOL', label: '리그오브레전드', limit: 5 },
    { value: 'BATTLEGROUNDS', label: '배틀그라운드', limit: 4 },
    { value: 'VALORANT', label: '발로란트', limit: 5 },
];

export default function TeamCreateForm() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [memberIds, setMemberIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!search) return;
        // 유저 검색: 게임 프로필이 등록된 유저만 검색
        const res = await fetch(`/api/user-search?query=${encodeURIComponent(search)}`);
        const data = await res.json();
        setSearchResult(data);
    };

    const handleAddMember = (id: string) => {
        if (!memberIds.includes(id)) setMemberIds([...memberIds, id]);
    };
    const handleRemoveMember = (id: string) => {
        setMemberIds(memberIds.filter((mid) => mid !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const res = await fetch('/api/team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, memberIds }),
        });
        if (res.ok) toast.success('팀 생성 완료!');
        else toast.error('팀 생성 실패');
        setLoading(false);
    };

    const limit = GAMES.find((g) => g.value === category)?.limit || 0;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded bg-white shadow-md">
            <h2 className="text-xl font-bold mb-4">팀 생성</h2>
            <label className="block mb-2">
                카테고리(게임)
                <select
                    aria-label="카테고리 선택"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="">선택</option>
                    {GAMES.map((g) => (
                        <option key={g.value} value={g.value}>
                            {g.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block mb-2">
                팀 이름
                <input
                    aria-label="팀 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="팀 이름을 입력하세요"
                />
            </label>
            <div className="mb-2">
                팀원({memberIds.length}/{limit})
            </div>
            <ul className="mb-2">
                {memberIds.map((id) => (
                    <li key={id} className="flex items-center gap-2">
                        <span>{id}</span>
                        <button
                            type="button"
                            aria-label="팀원 제거"
                            onClick={() => handleRemoveMember(id)}
                            className="text-red-500"
                        >
                            제거
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 mb-2">
                <input
                    aria-label="유저 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded p-2 flex-1"
                    placeholder="유저 검색(닉네임, 아이디 등)"
                />
                <button
                    type="button"
                    aria-label="검색"
                    onClick={handleSearch}
                    className="px-2 py-1 bg-gray-200 rounded"
                >
                    검색
                </button>
            </div>
            <ul className="mb-2">
                {searchResult.map((u) => (
                    <li key={u.id} className="flex items-center gap-2">
                        <span>{u.nickname || u.name || u.email}</span>
                        <button
                            type="button"
                            aria-label="팀원 추가"
                            onClick={() => handleAddMember(u.id)}
                            className="text-blue-500"
                        >
                            추가
                        </button>
                    </li>
                ))}
            </ul>
            <button
                type="submit"
                aria-label="팀 생성"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loading || !category || !name || memberIds.length === 0 || memberIds.length > limit}
            >
                생성
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </form>
    );
}

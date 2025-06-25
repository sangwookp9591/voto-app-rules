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
    const [searchResult, setSearchResult] = useState<
        { id: string; nickname?: string; name?: string; email?: string }[]
    >([]);
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
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-8 border border-soopborder rounded-card bg-white shadow-card"
        >
            <h2 className="text-2xl font-bold mb-6 text-soopgreen">팀 생성</h2>
            <label className="block mb-4 font-semibold text-sooptext">
                카테고리(게임)
                <select
                    aria-label="카테고리 선택"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-soopborder rounded-btn p-2 mt-1 focus:ring-2 focus:ring-soopgreen"
                >
                    <option value="">선택</option>
                    {GAMES.map((g) => (
                        <option key={g.value} value={g.value}>
                            {g.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block mb-4 font-semibold text-sooptext">
                팀 이름
                <input
                    aria-label="팀 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-soopborder rounded-btn p-2 mt-1 focus:ring-2 focus:ring-soopgreen"
                    placeholder="팀 이름을 입력하세요"
                />
            </label>
            <div className="mb-2 text-soopblue font-semibold">
                팀원({memberIds.length}/{limit})
            </div>
            <ul className="mb-4">
                {memberIds.map((id) => (
                    <li key={id} className="flex items-center gap-2 bg-soopgray rounded-btn px-3 py-1 mb-1">
                        <span>{id}</span>
                        <button
                            type="button"
                            aria-label="팀원 제거"
                            onClick={() => handleRemoveMember(id)}
                            className="text-soopred font-bold hover:underline"
                        >
                            제거
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 mb-4">
                <input
                    aria-label="유저 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-soopborder rounded-btn p-2 flex-1 focus:ring-2 focus:ring-soopgreen"
                    placeholder="유저 검색(닉네임, 아이디 등)"
                />
                <button
                    type="button"
                    aria-label="검색"
                    onClick={handleSearch}
                    className="px-4 py-2 bg-soopblue text-white rounded-btn shadow-btn font-semibold hover:bg-soopgreen transition"
                >
                    검색
                </button>
            </div>
            <ul className="mb-4">
                {searchResult.map((u) => (
                    <li key={u.id} className="flex items-center gap-2 bg-soopgray rounded-btn px-3 py-1 mb-1">
                        <span>{u.nickname || u.name || u.email}</span>
                        <button
                            type="button"
                            aria-label="팀원 추가"
                            onClick={() => handleAddMember(u.id)}
                            className="text-soopgreen font-bold hover:underline"
                        >
                            추가
                        </button>
                    </li>
                ))}
            </ul>
            <button
                type="submit"
                aria-label="팀 생성"
                className="w-full px-4 py-2 bg-soopgreen text-white rounded-btn shadow-btn font-semibold hover:bg-soopblue transition"
                disabled={loading || !category || !name || memberIds.length === 0 || memberIds.length > limit}
            >
                생성
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </form>
    );
}

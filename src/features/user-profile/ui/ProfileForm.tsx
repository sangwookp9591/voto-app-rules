'use client';
import React, { useEffect, useState } from 'react';
import type { UserProfile } from '@/entities/user/profileTypes';

const GAMES = [
    { value: 'LOL', label: '리그오브레전드' },
    { value: 'BATTLEGROUNDS', label: '배틀그라운드' },
    { value: 'VALORANT', label: '발로란트' },
];

export default function ProfileForm() {
    const [profile, setProfile] = useState<Partial<UserProfile>>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/user-profile')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.id) setProfile(data);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const res = await fetch('/api/user-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
        });
        if (res.ok) setMessage('저장 완료!');
        else setMessage('저장 실패');
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">게임 프로필 등록/수정</h2>
            <label className="block mb-2">
                게임
                <select
                    name="game"
                    value={profile.game || ''}
                    onChange={handleChange}
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
                게임 닉네임/아이디
                <input
                    name="gameId"
                    value={profile.gameId || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </label>
            <label className="block mb-2">
                티어
                <input
                    name="tier"
                    value={profile.tier || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </label>
            <label className="block mb-2">
                점수
                <input
                    name="point"
                    type="number"
                    value={profile.point || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </label>
            <label className="block mb-2">
                포지션
                <input
                    name="position"
                    value={profile.position || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                저장
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </form>
    );
}

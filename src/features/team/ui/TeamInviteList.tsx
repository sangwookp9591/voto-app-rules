'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Invite {
    id: string;
    status: string;
    team: { id: string; name: string; category: string };
}

export default function TeamInviteList() {
    const [invites, setInvites] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchInvites = async () => {
        const res = await fetch('/api/team-invite');
        const data = await res.json();
        setInvites(data);
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    const handleAction = async (inviteId: string, status: 'accepted' | 'rejected') => {
        setLoading(true);
        setMessage('');
        const res = await fetch('/api/team-invite', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inviteId, status }),
        });
        if (res.ok) {
            toast.success('처리 완료!');
            fetchInvites();
        } else {
            toast.error('처리 실패');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-8 border border-soopborder rounded-card bg-white shadow-card mt-4">
            <h2 className="text-2xl font-bold mb-4 text-soopgreen">내 팀 초대 목록</h2>
            {invites.length === 0 && <div>초대가 없습니다.</div>}
            <ul>
                {invites.map((invite) => (
                    <li key={invite.id} className="flex items-center gap-2 mb-3 bg-soopgray rounded-btn px-3 py-2">
                        <span className="font-semibold text-sooptext">
                            [{invite.team.category}] {invite.team.name}
                        </span>
                        <span
                            className={`text-sm font-semibold ${
                                invite.status === 'pending'
                                    ? 'text-soopblue'
                                    : invite.status === 'accepted'
                                    ? 'text-soopgreen'
                                    : 'text-soopred'
                            }`}
                        >
                            ({invite.status})
                        </span>
                        {invite.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleAction(invite.id, 'accepted')}
                                    className="px-3 py-1 bg-soopgreen text-white rounded-btn shadow-btn font-semibold hover:bg-soopblue transition"
                                    disabled={loading}
                                >
                                    수락
                                </button>
                                <button
                                    onClick={() => handleAction(invite.id, 'rejected')}
                                    className="px-3 py-1 bg-soopred text-white rounded-btn shadow-btn font-semibold hover:bg-red-700 transition"
                                    disabled={loading}
                                >
                                    거절
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </div>
    );
}

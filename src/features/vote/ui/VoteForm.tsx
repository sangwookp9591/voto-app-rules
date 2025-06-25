'use client';
import React, { useState } from 'react';
import TeamList from '@/features/team/ui/TeamList';

export default function VoteForm() {
    const [selected, setSelected] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVote = async () => {
        if (!selected) return;
        setLoading(true);
        setMessage('');
        const res = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ candidateId: selected }),
        });
        if (res.ok) setMessage('투표 완료!');
        else {
            const err = await res.json();
            setMessage(err.error || '투표 실패');
        }
        setLoading(false);
    };

    return (
        <div>
            <TeamList onVote={setSelected} />
            <div className="mb-4 mt-4">
                내 투표: <span className="font-semibold">{selected ? selected : '아직 없음'}</span>
            </div>
            <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                disabled={!selected || loading}
                onClick={handleVote}
            >
                투표하기
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </div>
    );
}

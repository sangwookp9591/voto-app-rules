'use client';
import React, { useState, useEffect } from 'react';
import TeamList from '@/features/team/ui/TeamList';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { toast } from 'react-toastify';
dayjs.extend(duration);

const DEADLINE = dayjs('2024-07-07T23:59:00+09:00');

export default function VoteForm() {
    const [selected, setSelected] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [now, setNow] = useState(dayjs());
    const isClosed = now.isAfter(DEADLINE);

    useEffect(() => {
        const timer = setInterval(() => setNow(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    const remain = DEADLINE.diff(now) > 0 ? DEADLINE.diff(now) : 0;
    const remainText = isClosed ? '투표가 마감되었습니다.' : `남은 시간: ${dayjs.duration(remain).format('HH:mm:ss')}`;

    const handleVote = async () => {
        if (!selected) return;
        setLoading(true);
        setMessage('');
        const res = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ candidateId: selected }),
        });
        if (res.ok) toast.success('투표 완료!');
        else {
            const err = await res.json();
            toast.error(err.error || '투표 실패');
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="mb-2 text-red-600 font-semibold text-center sm:text-left">{remainText}</div>
            <div className="sm:flex sm:gap-8">
                <div className="flex-1">
                    <TeamList onVote={setSelected} />
                </div>
                <div className="flex-1 mt-4 sm:mt-0">
                    <div className="mb-4 mt-4">
                        내 투표: <span className="font-semibold">{selected ? selected : '아직 없음'}</span>
                    </div>
                    <button
                        aria-label="투표하기"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded mb-2"
                        disabled={!selected || loading || isClosed}
                        onClick={handleVote}
                    >
                        투표하기
                    </button>
                    {message && <div className="mt-2 text-green-600">{message}</div>}
                </div>
            </div>
        </div>
    );
}

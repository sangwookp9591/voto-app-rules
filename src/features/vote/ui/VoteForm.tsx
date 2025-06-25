import React, { useState } from 'react';
import type { Candidate } from '@/entities/candidate/types';

const mockCandidates: Candidate[] = [
    { id: '1', name: '팀A', description: '설명', image: '/globe.svg' },
    { id: '2', name: '팀B', description: '설명', image: '/window.svg' },
];

export default function VoteForm() {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <div>
            <div className="mb-4">투표 마감: 2024-07-07 23:59</div>
            <ul className="mb-6">
                {mockCandidates.map((c) => (
                    <li key={c.id} className="flex items-center gap-4 mb-2 p-2 border rounded">
                        <img src={c.image} alt={c.name} className="w-10 h-10" />
                        <span className="flex-1">
                            {c.name} - {c.description}
                        </span>
                        <button
                            className={`px-2 py-1 rounded ${
                                selected === c.id ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'
                            }`}
                            onClick={() => setSelected(c.id)}
                        >
                            선택
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mb-4">
                내 투표:{' '}
                <span className="font-semibold">
                    {selected ? mockCandidates.find((c) => c.id === selected)?.name : '아직 없음'}
                </span>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={!selected}>
                투표하기
            </button>
        </div>
    );
}

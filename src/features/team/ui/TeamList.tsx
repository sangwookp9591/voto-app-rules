'use client';
import React, { useEffect, useState } from 'react';

interface Team {
    id: string;
    name: string;
    category: string;
    members: { userId: string }[];
}

export default function TeamList({ onVote }: { onVote?: (teamId: string) => void }) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/team')
            .then((res) => res.json())
            .then(setTeams);
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">팀 목록</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team.id} className="border rounded p-4 mb-2 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">
                                [{team.category}] {team.name}
                            </span>
                            <span className="text-sm">인원: {team.members.length}</span>
                        </div>
                        <button
                            className={`px-4 py-2 rounded ${
                                selected === team.id ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'
                            }`}
                            onClick={() => {
                                setSelected(team.id);
                                onVote && onVote(team.id);
                            }}
                        >
                            {selected === team.id ? '선택됨' : '투표하기'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

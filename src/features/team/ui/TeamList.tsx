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
            <h2 className="text-xl font-bold mb-4 text-soopgreen">팀 목록</h2>
            <ul>
                {teams.map((team) => (
                    <li
                        key={team.id}
                        className="bg-white border border-soopborder rounded-card shadow-card p-4 mb-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-sooptext">
                                [{team.category}] {team.name}
                            </span>
                            <span className="text-sm text-soopblue">인원: {team.members.length}</span>
                        </div>
                        <button
                            className={`w-full px-4 py-2 rounded-btn font-semibold shadow-btn transition-all mt-2 ${
                                selected === team.id
                                    ? 'bg-soopgreen text-white'
                                    : 'bg-soopblue text-white hover:bg-soopgreen'
                            }`}
                            onClick={() => {
                                setSelected(team.id);
                                if (onVote) onVote(team.id);
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

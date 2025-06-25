'use client';
import React, { useEffect, useState } from 'react';

interface UserProfile {
    game: string;
    gameId: string;
    tier: string;
    point: number;
    position: string;
}

interface Member {
    userId: string;
    user: { id: string; name?: string; nickname?: string; email?: string };
}

interface Team {
    id: string;
    name: string;
    category: string;
    members: Member[];
}

export default function TeamDetail({ teamId }: { teamId: string }) {
    const [team, setTeam] = useState<Team | null>(null);
    const [profiles, setProfiles] = useState<Record<string, UserProfile | null>>({});

    useEffect(() => {
        fetch(`/api/team?id=${teamId}`)
            .then((res) => res.json())
            .then(setTeam);
    }, [teamId]);

    useEffect(() => {
        if (!team) return;
        team.members.forEach((member) => {
            fetch(`/api/user-profile?userId=${member.userId}`)
                .then((res) => res.json())
                .then((profile) => setProfiles((p) => ({ ...p, [member.userId]: profile })));
        });
    }, [team]);

    if (!team) return <div>팀 정보를 불러오는 중...</div>;

    return (
        <div className="max-w-xl mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">
                [{team.category}] {team.name}
            </h2>
            <h3 className="font-semibold mb-2">멤버 목록</h3>
            <ul>
                {team.members.map((member) => (
                    <li key={member.userId} className="mb-2 border-b pb-2">
                        <div className="font-semibold">
                            {member.user.nickname || member.user.name || member.user.email}
                        </div>
                        {profiles[member.userId] ? (
                            <div className="text-sm text-gray-600">
                                닉네임: {profiles[member.userId]?.gameId} / 티어: {profiles[member.userId]?.tier} /
                                점수: {profiles[member.userId]?.point} / 포지션: {profiles[member.userId]?.position}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400">게임 프로필 없음</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

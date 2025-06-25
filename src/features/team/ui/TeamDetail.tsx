'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    const { data: session } = useSession();
    const isLeader = session && team && session.user?.id === team.leaderId;
    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [addMemberId, setAddMemberId] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

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

    const handleEdit = async () => {
        const res = await fetch('/api/team', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teamId: team?.id, name: editName, category: editCategory }),
        });
        if (res.ok) setMessage('수정 완료');
        else setMessage('수정 실패');
    };

    const handleAddMember = async () => {
        const res = await fetch('/api/team', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teamId: team?.id, addMemberId }),
        });
        if (res.ok) setMessage('팀원 추가 완료');
        else setMessage('팀원 추가 실패');
    };

    const handleRemoveMember = async (userId: string) => {
        const res = await fetch('/api/team', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teamId: team?.id, removeMemberId: userId }),
        });
        if (res.ok) setMessage('팀원 삭제 완료');
        else setMessage('팀원 삭제 실패');
    };

    const handleDelete = async () => {
        if (!team) return;
        if (!confirm('정말 팀을 삭제하시겠습니까?')) return;
        const res = await fetch(`/api/team?teamId=${team.id}`, { method: 'DELETE' });
        if (res.ok) {
            alert('삭제 완료');
            router.push('/vote');
        } else {
            alert('삭제 실패');
        }
    };

    if (!team) return <div>팀 정보를 불러오는 중...</div>;

    return (
        <div className="max-w-xl mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">
                [{team.category}] {team.name}
            </h2>
            {isLeader && (
                <div className="mb-4 p-2 border rounded bg-gray-50">
                    <div className="mb-2 font-semibold">팀장 관리</div>
                    <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="팀명 수정"
                        className="border rounded p-1 mr-2"
                    />
                    <input
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="카테고리 수정"
                        className="border rounded p-1 mr-2"
                    />
                    <button onClick={handleEdit} className="px-2 py-1 bg-blue-500 text-white rounded">
                        수정
                    </button>
                    <div className="mt-2">
                        <input
                            value={addMemberId}
                            onChange={(e) => setAddMemberId(e.target.value)}
                            placeholder="추가할 유저ID"
                            className="border rounded p-1 mr-2"
                        />
                        <button onClick={handleAddMember} className="px-2 py-1 bg-green-500 text-white rounded">
                            팀원 추가
                        </button>
                    </div>
                    <button onClick={handleDelete} className="mt-2 px-2 py-1 bg-red-500 text-white rounded">
                        팀 삭제
                    </button>
                </div>
            )}
            <h3 className="font-semibold mb-2">멤버 목록</h3>
            <ul>
                {team.members.map((member) => (
                    <li key={member.userId} className="mb-2 border-b pb-2 flex justify-between items-center">
                        <div>
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
                        </div>
                        {isLeader && (
                            <button onClick={() => handleRemoveMember(member.userId)} className="text-red-500 text-sm">
                                삭제
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            {message && <div className="mt-2 text-green-600">{message}</div>}
        </div>
    );
}

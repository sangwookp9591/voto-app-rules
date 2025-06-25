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
    leaderId: string;
}

export default function TeamDetail({ teamId }: { teamId: string }) {
    const [team, setTeam] = useState<Team | null>(null);
    const [profiles, setProfiles] = useState<Record<string, UserProfile | null>>({});
    const { data: session } = useSession();
    const userId = (session?.user as { id: string })?.id;
    const isLeader = userId && team && userId === team.leaderId;
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
        <div className="max-w-xl mx-auto p-8 border border-soopborder rounded-card bg-white shadow-card">
            <h2 className="text-2xl font-bold mb-4 text-soopgreen">
                [{team.category}] {team.name}
            </h2>
            {isLeader && (
                <div className="mb-6 p-4 border border-soopborder rounded-card bg-soopgray">
                    <div className="mb-2 font-semibold text-sooptext">팀장 관리</div>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                        <input
                            aria-label="팀명 수정"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="팀명 수정"
                            className="border border-soopborder rounded-btn p-2 flex-1 focus:ring-2 focus:ring-soopgreen"
                        />
                        <input
                            aria-label="카테고리 수정"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="카테고리 수정"
                            className="border border-soopborder rounded-btn p-2 flex-1 focus:ring-2 focus:ring-soopgreen"
                        />
                        <button
                            aria-label="팀 정보 수정"
                            onClick={handleEdit}
                            className="px-4 py-2 bg-soopblue text-white rounded-btn shadow-btn font-semibold hover:bg-soopgreen transition"
                        >
                            수정
                        </button>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <input
                            aria-label="추가할 유저ID"
                            value={addMemberId}
                            onChange={(e) => setAddMemberId(e.target.value)}
                            placeholder="추가할 유저ID"
                            className="border border-soopborder rounded-btn p-2 flex-1 focus:ring-2 focus:ring-soopgreen"
                        />
                        <button
                            aria-label="팀원 추가"
                            onClick={handleAddMember}
                            className="px-4 py-2 bg-soopgreen text-white rounded-btn shadow-btn font-semibold hover:bg-soopblue transition"
                        >
                            팀원 추가
                        </button>
                    </div>
                    <button
                        aria-label="팀 삭제"
                        onClick={handleDelete}
                        className="mt-2 px-4 py-2 bg-soopred text-white rounded-btn shadow-btn font-semibold hover:bg-red-700 transition"
                    >
                        팀 삭제
                    </button>
                </div>
            )}
            <h3 className="font-semibold mb-2 text-sooptext">멤버 목록</h3>
            <ul>
                {team.members.map((member) => (
                    <li
                        key={member.userId}
                        className="mb-2 border-b border-soopborder pb-2 flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold text-soopgreen">
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
                            <button
                                onClick={() => handleRemoveMember(member.userId)}
                                className="text-soopred text-sm font-bold hover:underline"
                            >
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

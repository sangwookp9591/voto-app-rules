'use client';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

export default function ResultChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/vote')
            .then((res) => res.json())
            .then((results) => {
                // API 결과를 그래프용 데이터로 변환
                const chartData = results.map((team: any) => ({
                    name: team.name,
                    value: team._count?.votes || 0,
                }));
                setData(chartData);
            });
    }, []);

    // 순위 계산
    const sorted = [...data].sort((a, b) => b.value - a.value);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full mt-4">
                <ol className="list-decimal pl-5">
                    {sorted.map((team, idx) => (
                        <li key={team.name}>
                            {idx + 1}위: {team.name} ({team.value}표)
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '팀A', value: 60 },
    { name: '팀B', value: 40 },
];
const COLORS = ['#0088FE', '#00C49F'];

export default function ResultChart() {
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
                    <li>1위: 팀A (60표)</li>
                    <li>2위: 팀B (40표)</li>
                </ol>
            </div>
        </div>
    );
}

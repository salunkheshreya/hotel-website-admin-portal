import React from 'react';
import { Building2, Users, CalendarCheck, IndianRupee } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Dashboard.css'; // Reusing dashboard styles

const SuperAdminDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Hotels', value: '12', icon: <Building2 size={24} />, color: '#4f46e5' },
        { title: 'Total Users', value: '1,234', icon: <Users size={24} />, color: '#10b981' },
        { title: 'Total Bookings', value: '856', icon: <CalendarCheck size={24} />, color: '#f59e0b' },
        { title: 'Total Revenue', value: '₹45.2L', icon: <IndianRupee size={24} />, color: '#ef4444' },
    ];

    const revenueData = [
        { name: 'Jan', revenue: 400000 },
        { name: 'Feb', revenue: 300000 },
        { name: 'Mar', revenue: 500000 },
        { name: 'Apr', revenue: 450000 },
        { name: 'May', revenue: 600000 },
        { name: 'Jun', revenue: 550000 },
    ];

    return (
        <div className="dashboard-container">
            <h1 className="page-title">Global Dashboard</h1>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-title">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-charts">
                <div className="chart-card">
                    <h3 className="chart-title">Revenue Overview</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;

import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Users, Briefcase } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import config from '../config';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        bookingsCount: 0,
        totalGuests: 0,
        occupancyRate: '0%'
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/get_dashboard_stats.php`);
                const result = await response.json();
                if (result.status === 'success') {
                    setStats(result.stats);
                    setRecentBookings(result.recentBookings);
                    setRevenueData(result.revenueData);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard Overview</h1>

            <div className="stats-grid">
                <StatsCard title="Total Revenue" value={`₹${Number(stats.totalRevenue).toLocaleString()}`} icon={<DollarSign />} color="bg-green-500" />
                <StatsCard title="Bookings" value={stats.bookingsCount} icon={<Calendar />} color="bg-blue-500" />
                <StatsCard title="Total Guests" value={stats.totalGuests} icon={<Users />} color="bg-purple-500" />
                <StatsCard title="Occupancy Rate" value={stats.occupancyRate} icon={<Briefcase />} color="bg-orange-500" />
                <StatsCard title="Total Payments" value={`₹${Number(stats.totalPayments).toLocaleString()}`} icon={<DollarSign />} color="bg-indigo-500" />
            </div>

            <div className="charts-grid">
                {/* Chart Section */}
                <div className="chart-card">
                    <h2 className="card-title">Revenue Analytics</h2>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="activity-card">
                    <h2 className="card-title">Recent Bookings</h2>
                    <div className="activity-list">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Guest</th>
                                    <th>Room</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.length > 0 ? (
                                    recentBookings.map((booking, index) => (
                                        <tr key={booking.id || index}>
                                            <td style={{ fontWeight: 500 }}>{booking.id}</td>
                                            <td>{booking.guest}</td>
                                            <td>{booking.room}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.amount}</td>
                                            <td>
                                                <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No recent bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

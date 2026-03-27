import React, { useState } from 'react';
import { Shield, FileText, CreditCard, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import '../../pages/Rooms.css'; // Reuse existing styles for containers

const SystemControl = () => {
    const [activeTab, setActiveTab] = useState('logs');

    // Mock Data
    const logs = [
        { id: 1, action: 'User Login', user: 'Admin User', time: '2 mins ago', type: 'info' },
        { id: 2, action: 'Hotel Added', user: 'Super Admin', time: '1 hour ago', type: 'success' },
        { id: 3, action: 'Failed Login', user: 'Unknown IP', time: '2 hours ago', type: 'error' },
    ];

    const plans = [
        { id: 1, name: 'Basic', price: '₹999/mo', features: ['Up to 1 Hotel', '5 Users', 'Basic Support'] },
        { id: 2, name: 'Pro', price: '₹2499/mo', features: ['Up to 5 Hotels', '20 Users', 'Priority Support'] },
        { id: 3, name: 'Enterprise', price: 'Custom', features: ['Unlimited Hotels', 'Unlimited Users', 'Dedicated Manager'] },
    ];

    const pendingHotels = [
        { id: 1, name: 'Mountain View Inn', address: 'Hill Station, North', applicant: 'John Doe', date: '2023-10-25' },
        { id: 2, name: 'Urban Pods', address: 'Metro City, Center', applicant: 'Jane Smith', date: '2023-10-26' },
    ];

    const handleApprove = (id) => {
        alert(`Hotel request ${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Hotel request ${id} rejected.`);
    };

    return (
        <div className="rooms-container">
            <div className="page-header">
                <h1 className="page-title">System Control</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <button
                    onClick={() => setActiveTab('logs')}
                    style={{
                        padding: '0.75rem 1rem',
                        borderBottom: activeTab === 'logs' ? '2px solid #3b82f6' : 'none',
                        color: activeTab === 'logs' ? '#3b82f6' : '#64748b',
                        fontWeight: 500,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <FileText size={18} /> System Logs
                </button>
                <button
                    onClick={() => setActiveTab('plans')}
                    style={{
                        padding: '0.75rem 1rem',
                        borderBottom: activeTab === 'plans' ? '2px solid #3b82f6' : 'none',
                        color: activeTab === 'plans' ? '#3b82f6' : '#64748b',
                        fontWeight: 500,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <CreditCard size={18} /> Subscription Plans
                </button>
                <button
                    onClick={() => setActiveTab('approvals')}
                    style={{
                        padding: '0.75rem 1rem',
                        borderBottom: activeTab === 'approvals' ? '2px solid #3b82f6' : 'none',
                        color: activeTab === 'approvals' ? '#3b82f6' : '#64748b',
                        fontWeight: 500,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Shield size={18} /> Approvals
                    {pendingHotels.length > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '999px' }}>{pendingHotels.length}</span>}
                </button>
            </div>

            {/* Content */}
            <div className="tab-content">
                {activeTab === 'logs' && (
                    <div className="table-container">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Recent System Activities</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ color: '#64748b' }}>{log.time}</td>
                                        <td style={{ fontWeight: 500 }}>{log.action}</td>
                                        <td>{log.user}</td>
                                        <td>
                                            {log.type === 'error' ? <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14} /> Failed</span> :
                                                log.type === 'success' ? <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} /> Success</span> :
                                                    <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FileText size={14} /> Info</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'plans' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {plans.map(plan => (
                            <div key={plan.id} style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginBottom: '1.5rem' }}>{plan.price}</div>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#475569' }}>
                                            <CheckCircle size={16} color="#10b981" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Edit Plan</button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'approvals' && (
                    <div className="table-container">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Pending Hotel Registrations</h3>
                        {pendingHotels.length === 0 ? (
                            <p style={{ color: '#64748b', padding: '1rem' }}>No pending approvals.</p>
                        ) : (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Hotel Name</th>
                                        <th>Location</th>
                                        <th>Applicant</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingHotels.map(hotel => (
                                        <tr key={hotel.id}>
                                            <td style={{ color: '#64748b' }}>{hotel.date}</td>
                                            <td style={{ fontWeight: 500 }}>{hotel.name}</td>
                                            <td>{hotel.address}</td>
                                            <td>{hotel.applicant}</td>
                                            <td>
                                                <button onClick={() => handleApprove(hotel.id)} className="action-btn" title="Approve" style={{ color: '#10b981', background: '#dcfce7' }}>
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button onClick={() => handleReject(hotel.id)} className="action-btn" title="Reject" style={{ color: '#ef4444', background: '#fee2e2' }}>
                                                    <XCircle size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SystemControl;

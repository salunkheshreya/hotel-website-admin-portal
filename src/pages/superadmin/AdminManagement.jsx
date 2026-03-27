import React, { useState } from 'react';
import { User, Plus, Search, Edit, Trash2, KeyRound, X, Building } from 'lucide-react';
import '../../pages/Rooms.css'; // Reuse existing styles

const initialAdmins = [
    { id: 1, name: 'Dave Smith', email: 'dave@grandhotel.com', hotel: 'Grand Hotel', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sarah Jones', email: 'sarah@seaside.com', hotel: 'Seaside Resort', role: 'Admin', status: 'Active' },
];

const AdminManagement = () => {
    const [admins, setAdmins] = useState(initialAdmins);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Filter admins
    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.hotel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Delete Admin
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this admin?')) {
            setAdmins(admins.filter(a => a.id !== id));
        }
    };

    // Reset Password
    const handleResetPassword = (email) => {
        alert(`Password reset link sent to ${email}`);
    };

    // Open Add Modal
    const handleAdd = () => {
        setCurrentAdmin({ name: '', email: '', hotel: '', role: 'Admin', status: 'Active', password: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleEdit = (admin) => {
        setCurrentAdmin(admin);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setAdmins(admins.map(a => a.id === currentAdmin.id ? currentAdmin : a));
        } else {
            setAdmins([...admins, { ...currentAdmin, id: admins.length + 1 }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="rooms-container">
            <div className="page-header">
                <h1 className="page-title">Admin Management</h1>
                <button onClick={handleAdd} className="btn btn-primary">
                    <Plus size={20} /> Create Hotel Admin
                </button>
            </div>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search admins..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Hotel Assigned</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAdmins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '2rem', height: '2rem', backgroundColor: '#e2e8f0',
                                                borderRadius: '50%', display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', marginRight: '0.75rem', color: '#64748b'
                                            }}>
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 500 }}>{admin.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{admin.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Building size={16} className="text-gray-400" />
                                            {admin.hotel}
                                        </div>
                                    </td>
                                    <td>{admin.role}</td>
                                    <td>
                                        <span className={`status-badge ${admin.status.toLowerCase()}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleResetPassword(admin.email)} className="action-btn" title="Reset Password">
                                            <KeyRound size={18} />
                                        </button>
                                        <button onClick={() => handleEdit(admin)} className="action-btn" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(admin.id)} className="action-btn delete" title="Remove">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="details-header">
                            <h2 className="modal-title">{isEditing ? 'Edit Admin' : 'Create Hotel Admin'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="details-close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" value={currentAdmin.name} onChange={e => setCurrentAdmin({ ...currentAdmin, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={currentAdmin.email} onChange={e => setCurrentAdmin({ ...currentAdmin, email: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assign Hotel</label>
                                <select className="form-control" value={currentAdmin.hotel} onChange={e => setCurrentAdmin({ ...currentAdmin, hotel: e.target.value })} required>
                                    <option value="">Select Hotel</option>
                                    <option value="Grand Hotel">Grand Hotel</option>
                                    <option value="Seaside Resort">Seaside Resort</option>
                                </select>
                            </div>
                            {!isEditing && (
                                <div className="form-group">
                                    <label className="form-label">Initial Password</label>
                                    <input type="password" className="form-control" value={currentAdmin.password} onChange={e => setCurrentAdmin({ ...currentAdmin, password: e.target.value })} required />
                                </div>
                            )}
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create Admin'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManagement;

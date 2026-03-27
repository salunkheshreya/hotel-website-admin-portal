import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2, Eye, X, CheckCircle, Ban, Users } from 'lucide-react';
import '../../components/Sidebar.css';
import '../../pages/Rooms.css'; // Reuse existing styles

const initialHotels = [
    {
        id: 1,
        name: 'Grand Hotel',
        address: '123 Main St, Cityville',
        contact: '+91 9876543210',
        email: 'info@grandhotel.com',
        manager: 'Manager Dave',
        status: 'Active',
        staff: {
            cleaning: 5,
            cooking: 3,
            management: 2,
            managers: 1,
            counter: 2
        }
    },
    {
        id: 2,
        name: 'Seaside Resort',
        address: '456 Beach Rd, Coastline',
        contact: '+91 9123456780',
        email: 'contact@seaside.com',
        manager: 'Manager Sarah',
        status: 'Inactive',
        staff: {
            cleaning: 8,
            cooking: 4,
            management: 3,
            managers: 1,
            counter: 3
        }
    },
];

const HotelManagement = () => {
    const [hotels, setHotels] = useState(initialHotels);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [currentHotel, setCurrentHotel] = useState(null);
    const [selectedHotelStaff, setSelectedHotelStaff] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Filter hotels
    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Delete Hotel
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            setHotels(hotels.filter(hotel => hotel.id !== id));
        }
    };

    // Toggle Status
    const handleToggleStatus = (hotel) => {
        const newStatus = hotel.status === 'Active' ? 'Inactive' : 'Active';
        setHotels(hotels.map(h => h.id === hotel.id ? { ...h, status: newStatus } : h));
    };

    // Open Add Modal
    const handleAdd = () => {
        setCurrentHotel({
            name: '', address: '', contact: '', email: '', manager: '', status: 'Active',
            staff: { cleaning: 0, cooking: 0, management: 0, managers: 0, counter: 0 }
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleEdit = (hotel) => {
        setCurrentHotel(hotel);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Open Staff Modal
    const handleViewStaff = (hotel) => {
        setSelectedHotelStaff(hotel);
        setIsStaffModalOpen(true);
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setHotels(hotels.map(h => h.id === currentHotel.id ? currentHotel : h));
        } else {
            setHotels([...hotels, { ...currentHotel, id: hotels.length + 1 }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="rooms-container">
            <div className="page-header">
                <h1 className="page-title">Hotel Management</h1>
                <button onClick={handleAdd} className="btn btn-primary">
                    <Plus size={20} /> Add Hotel
                </button>
            </div>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search hotels..."
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
                                <th>Contact</th>
                                <th>Manager</th>
                                <th>Status</th>
                                <th>Staff Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHotels.map((hotel) => (
                                <tr key={hotel.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{hotel.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{hotel.address}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.875rem' }}>{hotel.contact}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{hotel.email}</div>
                                    </td>
                                    <td>{hotel.manager}</td>
                                    <td>
                                        <span className={`status-badge ${hotel.status.toLowerCase()}`}>
                                            {hotel.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleViewStaff(hotel)} className="action-btn" title="View Staff">
                                            <Users size={18} />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleToggleStatus(hotel)} className="action-btn" title={hotel.status === 'Active' ? 'Deactivate' : 'Activate'}>
                                            {hotel.status === 'Active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                                        </button>
                                        <button onClick={() => handleEdit(hotel)} className="action-btn" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(hotel.id)} className="action-btn delete" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hotel Modal (Add/Edit) */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="details-header">
                            <h2 className="modal-title">{isEditing ? 'Edit Hotel' : 'Add New Hotel'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="details-close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Hotel Name</label>
                                <input type="text" className="form-control" value={currentHotel.name} onChange={e => setCurrentHotel({ ...currentHotel, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" value={currentHotel.address} onChange={e => setCurrentHotel({ ...currentHotel, address: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contact Number</label>
                                <input type="text" className="form-control" value={currentHotel.contact} onChange={e => setCurrentHotel({ ...currentHotel, contact: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={currentHotel.email} onChange={e => setCurrentHotel({ ...currentHotel, email: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Manager Name</label>
                                <input type="text" className="form-control" value={currentHotel.manager} onChange={e => setCurrentHotel({ ...currentHotel, manager: e.target.value })} required />
                            </div>
                            {!isEditing && (
                                <div className="form-group">
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>* Initial Staff counts will be 0. Manage staff via Staff Info.</p>
                                </div>
                            )}
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add Hotel'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Staff Info Modal */}
            {isStaffModalOpen && selectedHotelStaff && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <div className="details-header">
                            <h2 className="modal-title">Staff Info: {selectedHotelStaff.name}</h2>
                            <button onClick={() => setIsStaffModalOpen(false)} className="details-close-btn"><X size={24} /></button>
                        </div>
                        <div className="p-4">
                            <ul className="list-group" style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                                    <span>Cleaning Staff</span> <span style={{ fontWeight: 600 }}>{selectedHotelStaff.staff.cleaning}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                                    <span>Cooking Staff</span> <span style={{ fontWeight: 600 }}>{selectedHotelStaff.staff.cooking}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                                    <span>Management Staff</span> <span style={{ fontWeight: 600 }}>{selectedHotelStaff.staff.management}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                                    <span>Managers</span> <span style={{ fontWeight: 600 }}>{selectedHotelStaff.staff.managers}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                    <span>Counter Staff</span> <span style={{ fontWeight: 600 }}>{selectedHotelStaff.staff.counter}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={() => setIsStaffModalOpen(false)} className="btn btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelManagement;

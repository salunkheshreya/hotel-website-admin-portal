import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import './Rooms.css';

const initialRooms = [
    { id: 1, title: 'The Oberoi', location: 'Jaipur, india', price: 85356.00, status: 'Available', image: '/assets/hotels/hotel_image_two.jpg' },
    { id: 2, title: 'Sky Blue', location: 'Bangalore, india', price: 20000.00, status: 'Booked', image: '/assets/hotels/hotel_image_three.jpg' },
    { id: 3, title: 'Vythiri Village Resort', location: 'Kerala, india', price: 19757.00, status: 'Available', image: '/assets/hotels/hotel_image_four.jpg' },
    { id: 4, title: 'snow villa', location: 'Manali, india', price: 23412.00, status: 'Available', image: '/assets/hotels/hotel_image_9.jpg' },
    { id: 5, title: 'Anantya By The Lake', location: 'TamilNadu, india', price: 9323.00, status: 'Booked', image: '/assets/hotels/hotel_image_10.jpg' },
    { id: 6, title: 'Dynasty Resort', location: 'Pune, india', price: 84225.00, status: 'Available', image: '/assets/hotels/hotel_image_one.jpg' },
    { id: 7, title: 'Hilton', location: 'Goa, india', price: 12225.00, status: 'Available', image: '/assets/hotels/hotel_image_1.jpg' },
    { id: 8, title: 'Kalpanik Resort', location: 'Mumbai, india', price: 13425.00, status: 'Booked', image: '/assets/hotels/hotel_image_2.jpg' },
    { id: 9, title: 'Ritz-Carlton', location: 'Hydrabadh, india', price: 13976.00, status: 'Available', image: '/assets/hotels/hotel_image_11.jpg' },
    { id: 10, title: 'Bolgatty Palace', location: 'manali, india', price: 7225.00, status: 'Available', image: '/assets/hotels/hotel_image_21.jpg' },
    { id: 11, title: 'The Retreat Mashobra', location: 'Shimla, india', price: 4215.00, status: 'Booked', image: '/assets/hotels/hotel_image_8.jpg' },
    { id: 12, title: 'The Retreat Mashobra', location: 'Shimla, india', price: 8742.00, status: 'Booked', image: '/assets/hotels/hotel_image_7.jpg' },
    { id: 13, title: 'Alleppey', location: 'Kerala, india', price: 15324.00, status: 'Available', image: '/assets/hotels/hotel_image_12.jpg' },
    { id: 14, title: 'PerfectStayz', location: 'Hydrabadh, india', price: 9324.00, status: 'Booked', image: '/assets/hotels/hotel_image_22.jpg' },
    { id: 15, title: 'Radisson Kufri', location: 'Goa, india', price: 5324.00, status: 'Available', image: '/assets/hotels/hotel_image_14.jpg' },
    { id: 16, title: 'The Zion', location: 'Shimla, india', price: 6324.00, status: 'Booked', image: '/assets/hotels/hotel_image_19.jpg' },
    { id: 17, title: 'The Oberoi Cecil', location: 'Manali, india', price: 6824.00, status: 'Available', image: '/assets/hotels/hotel_image_20.jpg' },
    { id: 18, title: 'The Orchid Hotel', location: 'Pune, india', price: 7574.00, status: 'Booked', image: '/assets/hotels/hotel_image_17.jpg' },
    { id: 19, title: 'The Retreat Mashobra', location: 'pune, india', price: 9586.00, status: 'Booked', image: '/assets/hotels/hotel_image_18.jpg' },
    { id: 20, title: 'Radisson Hotel', location: 'Dehli, india', price: 5324.00, status: 'Available', image: '/assets/hotels/hotel_image_15.jpg' },
    { id: 21, title: 'Alleppey', location: 'jaipur, india', price: 9864.00, status: 'Booked', image: '/assets/hotels/hotel_image_16.jpg' }
];

const Rooms = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({ title: '', location: '', price: '', status: 'Available', image: null });
    const [isEditing, setIsEditing] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewRoom, setViewRoom] = useState(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRooms = rooms.filter(room =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase()) || room.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            setRooms(rooms.filter(room => room.id !== id));
        }
    };

    const handleEdit = (room) => {
        setCurrentRoom(room);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleView = (room) => {
        setViewRoom(room);
        setIsViewModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentRoom({ title: '', location: '', price: '', status: 'Available', image: null });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setRooms(rooms.map(r => r.id === currentRoom.id ? currentRoom : r));
        } else {
            setRooms([...rooms, { ...currentRoom, id: rooms.length + 1 }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="rooms-container">
            <div className="page-header">
                <h1 className="page-title">Hotels Management</h1>
                <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                >
                    <Plus size={20} />
                    Add Hotel
                </button>
            </div>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search hotels or locations..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Hotel Name</th>
                                <th>Location</th>
                                <th>Price (₹)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.map((room) => (
                                <tr key={room.id}>
                                    <td style={{ fontWeight: 500 }}>{room.title}</td>
                                    <td>{room.location}</td>
                                    <td>₹{room.price}</td>
                                    <td>
                                        <span className={`status-badge ${room.status.toLowerCase()}`}>
                                            {room.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleView(room)} className="action-btn" title="View Details">
                                            <Eye size={18} />
                                        </button>
                                        <button onClick={() => handleEdit(room)} className="action-btn" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(room.id)} className="action-btn delete" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">{isEditing ? 'Edit Hotel' : 'Add Hotel'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Hotel Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentRoom.title}
                                    onChange={(e) => setCurrentRoom({ ...currentRoom, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentRoom.location}
                                    onChange={(e) => setCurrentRoom({ ...currentRoom, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={currentRoom.price}
                                    onChange={(e) => setCurrentRoom({ ...currentRoom, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    value={currentRoom.status}
                                    onChange={(e) => setCurrentRoom({ ...currentRoom, status: e.target.value })}
                                >
                                    <option>Available</option>
                                    <option>Occupied</option>
                                    <option>Maintenance</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hotel Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            // Create a fake URL for preview
                                            const imageUrl = URL.createObjectURL(file);
                                            setCurrentRoom({ ...currentRoom, image: imageUrl });
                                        }
                                    }}
                                />
                                {currentRoom.image && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Image:</p>
                                        <img
                                            src={currentRoom.image}
                                            alt="Room Preview"
                                            style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginTop: '4px' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && viewRoom && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '500px' }}>
                        <h2 className="modal-title">Hotel Details</h2>

                        {viewRoom.image && (
                            <img
                                src={viewRoom.image}
                                alt={viewRoom.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
                            />
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Hotel Name</p>
                                <p style={{ fontWeight: '500', color: '#111827' }}>{viewRoom.title}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Location</p>
                                <p style={{ fontWeight: '500', color: '#111827' }}>{viewRoom.location}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Price</p>
                                <p style={{ fontWeight: '500', color: '#111827' }}>₹{viewRoom.price}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Status</p>
                                <span className={`status-badge ${viewRoom.status.toLowerCase()}`}>
                                    {viewRoom.status}
                                </span>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ justifyContent: 'center' }}>
                            <button
                                type="button"
                                onClick={() => setIsViewModalOpen(false)}
                                className="btn btn-secondary"
                                style={{ width: '100%' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;

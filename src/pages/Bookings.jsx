import React, { useState } from 'react';
import { Eye, Search, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import './Rooms.css'; // Reuse table styles
import './Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);

    React.useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost/hotel-website/get_bookings.php');
            const data = await response.json();
            if (data.status === 'success') {
                setBookings(data.bookings);
            } else {
                console.error('Failed to fetch bookings', data.message);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBookings = bookings.filter(booking =>
        (booking.guest || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.id || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return <CheckCircle size={16} />;
            case 'Pending': return <Clock size={16} />;
            case 'Checked In': return <CheckCircle size={16} />;
            case 'Cancelled': return <XCircle size={16} />;
            case 'Refunded': return <DollarSign size={16} />;
            default: return null;
        }
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const closeDetails = () => {
        setSelectedBooking(null);
    };

    const handleStatusChange = (id, newStatus) => {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        if (selectedBooking && selectedBooking.id === id) {
            setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
    };

    return (
        <div className="rooms-container">
            <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>Booking Management</h1>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search bookings..."
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
                                <th>Booking ID</th>
                                <th>Guest Name</th>
                                <th>Room</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td style={{ fontWeight: 500 }}>{booking.id}</td>
                                    <td>{booking.guest}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.checkIn}</td>
                                    <td>{booking.checkOut}</td>
                                    <td>
                                        <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')} booking-status`}>
                                            {getStatusIcon(booking.status)}
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleViewDetails(booking)}
                                            className="action-btn"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="modal-overlay">
                    <div className="modal-content modal-content-lg">
                        <div className="details-header">
                            <h2 className="modal-title" style={{ margin: 0 }}>Booking Details</h2>
                            <button onClick={closeDetails} className="details-close-btn">
                                <XCircle size={24} />
                            </button>
                        </div>
                        <div className="details-body">
                            <div className="details-row">
                                <span className="details-label">Booking ID:</span>
                                <span className="details-value">{selectedBooking.id}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Guest Name:</span>
                                <span>{selectedBooking.guest}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Room:</span>
                                <span>{selectedBooking.room}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Check In:</span>
                                <span>{selectedBooking.checkIn}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Check Out:</span>
                                <span>{selectedBooking.checkOut}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Total Amount:</span>
                                <span className="details-value text-green">₹{selectedBooking.amount}</span>
                            </div>
                            <div className="details-row" style={{ alignItems: 'center' }}>
                                <span className="details-label">Status:</span>
                                <span className={`status-badge ${selectedBooking.status.toLowerCase().replace(' ', '-')} booking-status`}>
                                    {getStatusIcon(selectedBooking.status)}
                                    {selectedBooking.status}
                                </span>
                            </div>
                        </div>
                        <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {selectedBooking.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')}
                                            className="btn"
                                            style={{ backgroundColor: '#10b981', color: 'white', border: 'none' }}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')}
                                            className="btn"
                                            style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {selectedBooking.status === 'Confirmed' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedBooking.id, 'Checked In')}
                                            className="btn"
                                            style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none' }}
                                        >
                                            Check In
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')}
                                            className="btn"
                                            style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {selectedBooking.status === 'Checked In' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking.id, 'Checked Out')}
                                        className="btn"
                                        style={{ backgroundColor: '#64748b', color: 'white', border: 'none' }}
                                    >
                                        Check Out
                                    </button>
                                )}
                                {selectedBooking.status === 'Cancelled' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking.id, 'Refunded')}
                                        className="btn"
                                        style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none' }}
                                    >
                                        Process Refund
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={closeDetails}
                                className="btn btn-secondary"
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

export default Bookings;

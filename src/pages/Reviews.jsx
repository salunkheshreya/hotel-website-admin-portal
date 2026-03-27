import React, { useState } from 'react';
import { Search, Trash2, Star } from 'lucide-react';
import './Rooms.css'; // Inherit common styles
import './Reviews.css';

const initialReviews = [
    { id: 1, guest: 'Rahul Sharma', rating: 5, comment: 'Excellent stay! The staff was very helpful.', date: '2023-10-28' },
    { id: 2, guest: 'Sneha Patel', rating: 4, comment: 'Good room, but the wifi was a bit slow.', date: '2023-10-27' },
    { id: 3, guest: 'Amit Kumar', rating: 2, comment: 'Room was not clean upon arrival. Disappointed.', date: '2023-10-30' },
    { id: 4, guest: 'Priya Singh', rating: 5, comment: 'Loved the view from the Deluxe room!', date: '2023-11-05' },
    { id: 5, guest: 'John Doe', rating: 3, comment: 'Average experience. Breakfast could be better.', date: '2023-10-29' },
];

const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredReviews = reviews.filter(review =>
        review.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(review => review.id !== id));
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        style={{ opacity: i < rating ? 1 : 0.3 }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="reviews-container">
            <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>Review Management</h1>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search reviews..."
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
                                <th>Guest</th>
                                <th>Rating</th>
                                <th style={{ width: '40%' }}>Comment</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td style={{ fontWeight: 500 }}>{review.guest}</td>
                                    <td>{renderStars(review.rating)}</td>
                                    <td>
                                        <div style={{
                                            maxWidth: '400px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }} title={review.comment}>
                                            {review.comment}
                                        </div>
                                    </td>
                                    <td>{review.date}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="action-btn delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reviews;

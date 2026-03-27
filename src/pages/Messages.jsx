import React, { useState, useEffect } from 'react';
import { Mail, Calendar, User } from 'lucide-react';
import './Messages.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost/hotel-website/get_messages.php');
            const data = await response.json();
            if (data.status === 'success') {
                setMessages(data.data);
            } else {
                setError(data.message || 'Failed to load messages');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error connecting to backend API');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="messages-loading">Loading messages...</div>;
    if (error) return <div className="messages-error">{error}</div>;

    return (
        <div className="messages-container">
            <h1 className="page-title">Contact Messages</h1>

            {messages.length === 0 ? (
                <div className="no-messages">No messages received yet.</div>
            ) : (
                <div className="messages-grid">
                    {messages.map((msg) => (
                        <div key={msg.id} className="message-card">
                            <div className="message-header">
                                <div className="user-info">
                                    <User size={18} className="icon user-icon" />
                                    <span className="user-name">{msg.name}</span>
                                </div>
                                <div className="date-info">
                                    <Calendar size={14} className="icon date-icon" />
                                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="contact-info">
                                <Mail size={14} className="icon" />
                                <a href={`mailto:${msg.email}`}>{msg.email}</a>
                            </div>

                            <div className="message-body">
                                <h3>Message:</h3>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;

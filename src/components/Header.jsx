import React from 'react';
import { Bell, User } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h2 className="header-title">Overview</h2>

            <div className="header-actions">
                <button className="notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <div className="user-profile">
                    <div className="user-info">
                        <p className="user-name">Admin User</p>
                        <p className="user-role">Administrator</p>
                    </div>
                    <div className="user-avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

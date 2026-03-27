import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, BedDouble, CalendarCheck, Users, Settings, LogOut, Star, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/rooms', label: 'Hotels', icon: <Building2 size={20} /> },
        { path: '/bookings', label: 'Bookings', icon: <CalendarCheck size={20} /> },
        { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
        { path: '/reviews', label: 'Reviews', icon: <Star size={20} /> },
        { path: '/messages', label: 'Messages', icon: <Mail size={20} /> },
        { path: '/users', label: 'Users', icon: <Settings size={20} /> },
        { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">Hotel Admin</h1>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                {item.icon}
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={20} />
                    <span className="nav-label">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

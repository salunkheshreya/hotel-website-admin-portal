import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css'; // Reusing existing sidebar styles for consistency

const SuperAdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/superadmin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/superadmin/hotels', label: 'Hotel Management', icon: <Building2 size={20} /> },
        { path: '/superadmin/admins', label: 'Admin Management', icon: <Users size={20} /> },
        { path: '/superadmin/system', label: 'System Control', icon: <ShieldCheck size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">Super Admin</h1>
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
                                end={item.path === '/superadmin'}
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

export default SuperAdminSidebar;

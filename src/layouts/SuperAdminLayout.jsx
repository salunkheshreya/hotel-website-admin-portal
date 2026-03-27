import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import Header from '../components/Header';
import './DashboardLayout.css'; // Reusing layout styles

const SuperAdminLayout = () => {
    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <SuperAdminSidebar />

            {/* Main Content Area */}
            <div className="main-content-wrapper">
                {/* Header - might need adjustment if Header has specific admin logic, but usually generic */}
                <Header />

                {/* Page Content */}
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;

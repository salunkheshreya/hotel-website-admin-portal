import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Reviews from './pages/Reviews';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes inside DashboardLayout */}
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

import React, { useState } from 'react';
import { Search, Ban, CheckCircle } from 'lucide-react';
import './Rooms.css'; // Inherit common table styles
import './Customers.css';

const initialCustomers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', status: 'Active' },
    { id: 2, name: 'Sneha Patel', email: 'sneha@example.com', phone: '+91 87654 32109', status: 'Active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', status: 'Blocked' },
    { id: 4, name: 'Priya Singh', email: 'priya@example.com', phone: '+91 65432 10987', status: 'Active' },
    { id: 5, name: 'John Doe', email: 'john@example.com', phone: '+91 54321 09876', status: 'Active' },
];

const Customers = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    const toggleBlockStatus = (id) => {
        setCustomers(customers.map(customer => {
            if (customer.id === id) {
                return {
                    ...customer,
                    status: customer.status === 'Active' ? 'Blocked' : 'Active'
                };
            }
            return customer;
        }));
    };

    return (
        <div className="customers-container">
            <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>Customer Management</h1>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search customers..."
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td style={{ fontWeight: 500 }}>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <span className={`status-badge ${customer.status.toLowerCase()}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleBlockStatus(customer.id)}
                                            className={`action-btn ${customer.status === 'Active' ? 'delete' : ''}`}
                                            title={customer.status === 'Active' ? 'Block Customer' : 'Unblock Customer'}
                                        >
                                            {customer.status === 'Active' ? <Ban size={18} /> : <CheckCircle size={18} />}
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

export default Customers;

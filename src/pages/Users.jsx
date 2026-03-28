import config from '../config';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: 'Staff', status: 'Active' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/admin_api.php`);
            const data = await response.json();
            if (data.status === 'success') {
                setUsers(data.admins);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`${config.API_BASE_URL}/admin_api.php`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUsers(users.filter(user => user.id !== id));
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentUser({ name: '', email: '', role: 'Staff', status: 'Active' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEditing) {
                // UPDATE user
                const response = await fetch(`${config.API_BASE_URL}/admin_api.php`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentUser) 
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
                    setIsModalOpen(false);
                } else {
                    alert('Error updating: ' + data.message);
                }
            } else {
                // CREATE user
                const response = await fetch(`${config.API_BASE_URL}/admin_api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentUser) 
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUsers([...users, { ...currentUser, id: data.id }]);
                    setIsModalOpen(false);
                } else {
                    alert('Error creating: ' + data.message);
                }
            }
        } catch (err) {
            console.error(err);
            alert('A network error occurred.');
        }
    };

    return (
        <div className="rooms-container">
            <div className="page-header">
                <h1 className="page-title">User Management</h1>
                <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                >
                    <Plus size={20} />
                    Add User
                </button>
            </div>

            <div className="table-container">
                <div className="table-controls">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
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
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '2.5rem', height: '2.5rem',
                                                backgroundColor: '#e2e8f0', borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginRight: '1rem', color: '#64748b'
                                            }}>
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Shield size={14} style={{ color: '#3b82f6' }} /> {user.role}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(user)} className="action-btn">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="action-btn delete">
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
                        <div className="details-header">
                            <h2 className="modal-title">{isEditing ? 'Edit User' : 'Add User'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="details-close-btn">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentUser.name}
                                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={currentUser.email}
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-control"
                                    value={currentUser.role}
                                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                                >
                                    <option>Administrator</option>
                                    <option>Manager</option>
                                    <option>Staff</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    value={currentUser.status}
                                    onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
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
        </div>
    );
};

export default Users;

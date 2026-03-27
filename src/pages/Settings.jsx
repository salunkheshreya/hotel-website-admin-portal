import React from 'react';
import { Save } from 'lucide-react';
import './Rooms.css'; // For form styles
import './Settings.css';

const Settings = () => {
    const handleSave = (e) => {
        e.preventDefault();
        alert("Settings saved successfully!");
    };

    return (
        <div className="settings-container">
            <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>Settings</h1>

            <div className="settings-section">
                <h2 className="section-title">General Settings</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Hotel Name</label>
                        <input className="form-control" type="text" defaultValue="Luxury Stay Hotel" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contact Email</label>
                        <input className="form-control" type="email" defaultValue="contact@hotel.com" />
                    </div>
                </form>
            </div>

            <div className="settings-section">
                <h2 className="section-title">Appearance</h2>
                <div className="theme-options">
                    <label className="radio-label">
                        <input type="radio" name="theme" className="radio-input" defaultChecked />
                        <span>Light Mode</span>
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="theme" className="radio-input" />
                        <span>Dark Mode</span>
                    </label>
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
                <Save size={20} />
                Save Changes
            </button>
        </div>
    );
};

export default Settings;

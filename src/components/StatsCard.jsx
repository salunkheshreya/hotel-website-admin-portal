import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className="stats-card">
            <div className="stats-info">
                <p className="stats-label">{title}</p>
                <h3 className="stats-value">{value}</h3>
            </div>
            <div className={`stats-icon-wrapper ${color}`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
        </div>
    );
};

export default StatsCard;

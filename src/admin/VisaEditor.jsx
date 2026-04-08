import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVisaCountries, deleteVisaCountry } from '../api';

const VisaEditor = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const response = await getAllVisaCountries();
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching visa countries:', error);
            setMessage('Failed to load visa requirements.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete visa requirements for ${name}?`)) {
            try {
                await deleteVisaCountry(id);
                setCountries(countries.filter(c => c.id !== id));
                setMessage(`${name} requirements deleted successfully.`);
            } catch (error) {
                console.error('Error deleting country:', error);
                setMessage('Failed to delete country.');
            }
        }
    };

    if (loading) return <div className="admin-loading">Loading visa requirements...</div>;

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <div className="admin-card-title">
                    <i className="fas fa-passport"></i>
                    <h3>Country Visa Requirements</h3>
                </div>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => navigate('/admin/visa/new')}
                >
                    <i className="fas fa-plus"></i>
                    Add New Country
                </button>
            </div>

            {message && <div className={`admin-alert ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Country Name</th>
                            <th>ID</th>
                            <th>Requirements</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.id}>
                                <td>
                                    <img src={country.flag} alt={country.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                </td>
                                <td><strong>{country.name}</strong></td>
                                <td><code>{country.id}</code></td>
                                <td>{country.requirements?.length || 0} items</td>
                                <td>
                                    <span className={`status-badge ${country.status === 'active' ? 'active' : 'hidden'}`}>
                                        {country.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-table-actions">
                                        <button 
                                            className="action-btn edit" 
                                            title="Edit"
                                            onClick={() => navigate(`/admin/visa/edit/${country.id}`)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            className="action-btn delete" 
                                            title="Delete"
                                            onClick={() => handleDelete(country.id, country.name)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisaEditor;

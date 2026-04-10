import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVisaCountries, deleteVisaCountry } from '../api';
import { useToast } from '../context/ToastContext';

const VisaEditor = () => {
    const { toast } = useToast();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
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
            toast.error('Failed to load visa requirements.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        
        try {
            setIsDeleting(true);
            await deleteVisaCountry(itemToDelete._id);
            setCountries(countries.filter(c => c._id !== itemToDelete._id));
            setItemToDelete(null);
            toast.success('Visa requirements deleted successfully!');
        } catch (error) {
            console.error('Error deleting country:', error);
            toast.error('Failed to delete country. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };


    if (loading) return <div className="admin-loading">Loading visa requirements...</div>;

    return (
        <>
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-card-title">
                        <i className="fas fa-passport"></i>
                        <div>
                            <h3>Country Visa Requirements</h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '400', marginTop: '4px' }}>
                                Manage entry requirements, document checklists, and photo galleries for supported countries.
                            </p>
                        </div>
                    </div>
                    <button 
                        className="admin-btn admin-btn-primary"
                        onClick={() => navigate('/admin/visa/new')}
                    >
                        <i className="fas fa-plus"></i>
                        Add New Country
                    </button>
                </div>



                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Flag</th>
                                <th>Country Name</th>
                                <th>Priority</th>
                                <th>Requirements</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country) => (
                                <tr key={country._id}>
                                    <td>
                                        <img src={country.flag} alt={country.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                    </td>
                                    <td><strong>{country.name}</strong></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className="priority-badge">{country.priority || 0}</span>
                                    </td>
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
                                                onClick={() => navigate(`/admin/visa/edit/${country._id}`)}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                className="action-btn delete" 
                                                title="Delete"
                                                onClick={() => setItemToDelete(country)}
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
            
            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <div className="admin-modal-overlay" onClick={() => setItemToDelete(null)}>
                    <div className="admin-modal" style={{ maxWidth: '450px', width: '90%', animation: 'modalSlideIn 0.3s ease-out' }}>
                        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
                            <div style={{ 
                                width: '70px', 
                                height: '70px', 
                                background: '#fee2e2', 
                                color: '#ef4444', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0 auto 20px',
                                fontSize: '1.8rem'
                            }}>
                                <i className="fas fa-trash-can"></i>
                            </div>
                            
                            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '10px' }}>
                                Confirm Deletion
                            </h3>
                            
                            <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '30px' }}>
                                Are you sure you want to delete <strong style={{ color: '#1e293b' }}>"{itemToDelete.name}"</strong>? 
                                <br />
                                <span style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: '500' }}>
                                    <i className="fas fa-triangle-exclamation" style={{ marginRight: '6px' }}></i>
                                    This action cannot be undone.
                                </span>
                            </p>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button 
                                    className="admin-btn admin-btn-secondary" 
                                    onClick={() => setItemToDelete(null)}
                                    disabled={isDeleting}
                                    style={{ padding: '12px 24px', flex: 1 }}
                                >
                                    No, Keep it
                                </button>
                                <button 
                                    className="admin-btn admin-btn-danger" 
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    style={{ padding: '12px 24px', flex: 1 }}
                                >
                                    {isDeleting ? (
                                        <><i className="fas fa-circle-notch fa-spin"></i> Deleting...</>
                                    ) : (
                                        'Yes, Delete It'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default VisaEditor;

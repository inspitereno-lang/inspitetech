import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

export const Toast = ({ toast }) => {
    const { toast: toastManager } = useToast();
    const [isExiting, setIsExiting] = useState(false);

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            toastManager.remove(toast.id);
        }, 300); // Animation duration
    };

    return (
        <div className={`premium-toast ${toast.type} ${isExiting ? 'exit' : ''}`}>
            <div className="toast-icon">
                <i className={`fas ${icons[toast.type] || icons.info}`}></i>
            </div>
            <div className="toast-content">
                <div className="toast-title">{toast.title}</div>
                <div className="toast-message">{toast.message}</div>
            </div>
            <button className="toast-close" onClick={handleClose}>
                <i className="fas fa-xmark"></i>
            </button>
            <div className="toast-progress">
                <div 
                    className="toast-progress-bar" 
                    style={{ animationDuration: `${toast.duration}ms` }}
                ></div>
            </div>
        </div>
    );
};

export const ToastContainer = () => {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};

import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((title, message, type = 'info', duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, title, message, type, duration }]);
        
        if (duration !== Infinity) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
        
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, title = 'Success') => showToast(title, message, 'success'),
        error: (message, title = 'Error') => showToast(title, message, 'error', 8000),
        warning: (message, title = 'Warning') => showToast(title, message, 'warning'),
        info: (message, title = 'Info') => showToast(title, message, 'info'),
        remove: removeToast
    };

    return (
        <ToastContext.Provider value={{ toast, toasts }}>
            {children}
        </ToastContext.Provider>
    );
};

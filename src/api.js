import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Visa API Helpers
export const getVisaCountries = () => api.get('/visa/active');
export const getAllVisaCountries = () => api.get('/visa');
export const getVisaCountry = (id) => api.get(`/visa/${id}`);
export const createVisaCountry = (data) => api.post('/visa', data);
export const updateVisaCountry = (id, data) => api.put(`/visa/${id}`, data);
export const deleteVisaCountry = (id) => api.delete(`/visa/${id}`);

export default api;

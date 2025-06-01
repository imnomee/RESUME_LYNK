import axios from 'axios';

import { BASE_URL } from './apiPaths';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Handle token expiration or unauthorized access
                localStorage.removeItem('token');
                window.location.href = '/';
            } else if (error.response.status === 403) {
                // Handle forbidden access
                toast.error(
                    'You do not have permission to access this resource.'
                );
            } else if (error.response.status === 404) {
                // Handle not found
                toast.error('Resource not found.');
            } else if (error.response.status === 500) {
                // Handle server error
                toast.error('Server error:', error.response.data);
            } else {
                // Handle other errors
                toast.error(
                    error.response.data.message || 'An error occurred.'
                );
            }
        } else if (error.code === 'ECONNABORTED') {
            // Handle timeout error
            toast.error('Timeout error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AuthToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - redirecting to login');
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;


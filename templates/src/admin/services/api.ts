import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Base API URL - in a real app, this would be import.meta.env.VITE_API_URL
const API_URL = 'https://api.portfolio.dev/v1'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Add Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401/403
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear storage and redirect to login
      localStorage.removeItem('portfolio_admin_token');
      localStorage.removeItem('portfolio_admin_user');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Auth
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),

  // Dashboard
  getStats: () => api.get('/admin/stats'),

  // Projects
  getProjects: () => api.get('/projects'),
  getProject: (id: string) => api.get(`/projects/${id}`),
  createProject: (data: any) => api.post('/projects', data),
  updateProject: (id: string, data: any) => api.put(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  // Education
  getEducation: () => api.get('/education'),
  createEducation: (data: any) => api.post('/education', data),
  updateEducation: (id: string, data: any) => api.put(`/education/${id}`, data),
  deleteEducation: (id: string) => api.delete(`/education/${id}`),
};

export default api;
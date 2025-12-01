import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const response = await api.post('/login/', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        email: response.data.email,
        id: response.data.user_id
    }));
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register/', userData);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard-stats/');
  return response.data;
};

export const analyzeTopic = async (subject) => {
  const response = await api.post('/analyze/', { subject });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default api;

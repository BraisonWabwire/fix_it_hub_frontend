import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // your Django backend

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/api/token/`, {
    email,
    password,
  });
  const { access, refresh } = response.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

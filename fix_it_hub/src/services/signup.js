import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const signup = async (email, password, username = '') => {
  const response = await axios.post(`${BASE_URL}/api/register/`, {
    email,
    password,
    username
  });
  return response.data;
};

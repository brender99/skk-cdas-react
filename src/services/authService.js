import axios from 'axios';
import { getApiBaseUrl } from '../utils/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${getApiBaseUrl()}/api-php/routes/auth.php`, {
      username,
      password
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }

    return {
      status: true,
      data: response.data
    };
  } catch (error) {
    return {
      status: false,
      message: error.message
    };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${getApiBaseUrl()}/api-php/routes/logout.php`);
    
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }

    return {
      status: true
    };
  } catch (error) {
    console.error('Logout error:', error);
    // Even if API call fails, we still want to clear local storage
    return {
      status: false,
      message: error.message
    };
  }
};

import axios from 'axios';
import { getApiBaseUrl } from '../utils/api';

export const getWorkers = async (role = 'SKK', plant = 'MAIN') => {
  
  try {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/worker.php`, {
      params: { role, plant }
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }

    return {
      status: true,
      data: response.data.data || []
    };

  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: []
    };
  }
}

export const addWorker = async (data) => {
  try {
    const response = await axios.post(`${getApiBaseUrl()}/api-php/routes/worker.php`, {
      action: 'add',
      ...data
    });
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }
    return {
      status: true,
      data: response.data.data || []
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: []
    };
  }
}

export const updateWorker = async (operId, data) => {
  try {
    const response = await axios.post(`${getApiBaseUrl()}/api-php/routes/worker.php`, {
      action: 'update',
      operId,
      ...data
    });
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }
    return {
      status: true,
      data: response.data.data || []
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: []
    };
  }
}

export const deleteWorker = async (operId, role) => {
  try {
    const response = await axios.post(`${getApiBaseUrl()}/api-php/routes/worker.php`, {
      action: 'delete',
      operId,
      role
    });
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }
    return {
      status: true,
      data: response.data.data || []
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: []
    };
  }
}

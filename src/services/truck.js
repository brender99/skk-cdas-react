import axios from 'axios';
import { getApiBaseUrl } from '../utils/api';

export const truckService = {
  // Get all trucks
  getAllTrucks: async () => {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/truck.php`);
    return response.data;
  },

  // Get truck status summary
  getStatusSummary: async () => {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/truck-status.php`);
    return response.data;
  },

  // Get truck details
  getTruckDetails: async (id) => {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/truck.php`, {
      params: { id }
    });
    return response.data;
  },

  // Update truck status
  updateStatus: async (id, status) => {
    const response = await axios.put(`${getApiBaseUrl()}/api-php/routes/truck.php`, { 
      id, 
      status,
      action: 'update_status'
    });
    return response.data;
  },

  // Get truck history
  getTruckHistory: async (id) => {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/truck-history.php`, {
      params: { id }
    });
    return response.data;
  }
};

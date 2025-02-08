import api from './api';

export const truckService = {
  // Get all trucks
  getAllTrucks: async () => {
    const response = await api.get('/trucks');
    return response.data;
  },

  // Get truck status summary
  getStatusSummary: async () => {
    const response = await api.get('/trucks/status-summary');
    return response.data;
  },

  // Get truck details
  getTruckDetails: async (id) => {
    const response = await api.get(`/trucks/${id}`);
    return response.data;
  },

  // Update truck status
  updateStatus: async (id, status) => {
    const response = await api.put(`/trucks/${id}/status`, { status });
    return response.data;
  },

  // Get truck history
  getTruckHistory: async (id) => {
    const response = await api.get(`/trucks/${id}/history`);
    return response.data;
  }
};

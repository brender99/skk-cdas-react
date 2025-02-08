import api from './api';

export const reportService = {
  // Generate report
  generateReport: async (params) => {
    const response = await api.post('/reports/generate', params);
    return response.data;
  },

  // Export report as PDF
  exportPDF: async (params) => {
    const response = await api.post('/reports/export/pdf', params, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Export report as Excel
  exportExcel: async (params) => {
    const response = await api.post('/reports/export/excel', params, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Get worker report
  getWorkerReport: async (params) => {
    const response = await api.get('/reports/worker', { params });
    return response.data;
  },

  // Get delivery report
  getDeliveryReport: async (params) => {
    const response = await api.get('/reports/delivery', { params });
    return response.data;
  },

  // Get stock report
  getStockReport: async (params) => {
    const response = await api.get('/reports/stock', { params });
    return response.data;
  },

  // Get cement bay report (SKK only)
  getCementBayReport: async (params) => {
    const response = await api.get('/reports/cement-bay', { params });
    return response.data;
  },

  // Get cement stock report (SKK only)
  getCementStockReport: async (params) => {
    const response = await api.get('/reports/cement-stock', { params });
    return response.data;
  },

  // Get coupon report (SKK only)
  getCouponReport: async (params) => {
    const response = await api.get('/reports/coupon', { params });
    return response.data;
  },

  // Get clamp report (SMK only)
  getClampReport: async (params) => {
    const response = await api.get('/reports/clamp', { params });
    return response.data;
  },

  // Get delivery summary report (SMK only)
  getDeliverySummaryReport: async (params) => {
    const response = await api.get('/reports/delivery-summary', { params });
    return response.data;
  }
};

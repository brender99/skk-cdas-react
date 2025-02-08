/**
 * Get the base URL for API calls based on environment
 * @returns {string} The base API URL
 */
export const getApiBaseUrl = () => {
    return 'http://26.63.191.191';
};

/**
 * Build a complete API URL
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login')
 * @returns {string} The complete API URL
 */
export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}/api${path}`;
};

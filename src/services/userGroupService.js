import axios from 'axios';
import { getApiBaseUrl } from '../utils/api';

export const getUserGroups = async (company = 'SKK') => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/user-groups.php`, {
      params: { company }
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'API Error');
    }

    return response.data.data || [];
    
  } catch (error) {
    console.error('Failed to fetch user groups:', error);
    return [];
  }
}

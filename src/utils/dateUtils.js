/**
 * Format a date string to YYYY-MM-DD HH:mm format
 * @param {string} dateStr - Date string in any format
 * @param {boolean} includeTime - Whether to include time in the output
 * @returns {string} Formatted date string
 */
export function formatThaiDate(dateStr, includeTime = false) {
  if (!dateStr) return '';
  
  try {
    let date;
    
    // Try parsing DDMMRRRRHH24MISS format first
    if (dateStr.length === 14) {
      const day = dateStr.substring(0, 2);
      const month = dateStr.substring(2, 4);
      const year = dateStr.substring(4, 8);
      const hour = dateStr.substring(8, 10);
      const minute = dateStr.substring(10, 12);
      
      date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    } else {
      // Try standard date parsing
      date = new Date(dateStr);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateStr; // Return original string if parsing fails
    }
    
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateFormatted = `${year}-${month}-${day}`;
    
    if (!includeTime) return dateFormatted;
    
    // Add time HH:mm if requested
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${dateFormatted} ${hour}:${minute}`;
    
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr; // Return original string if formatting fails
  }
}

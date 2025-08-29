export const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.polygon.io';

if (!API_KEY) {
  throw new Error('VITE_POLYGON_API_KEY environment variable is required');
}

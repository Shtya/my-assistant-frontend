import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = 'http://localhost:8081/'


export const api = axios.create({
  baseURL: baseUrl + 'api/v1/',
});

api.interceptors.request.use(
  config => {
    // Get user data from cookies
    const userCookie = Cookies.get('user');

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        if (userData.accessToken) {
          config.headers.Authorization = `Bearer ${userData.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get user data from cookies
        const userCookie = Cookies.get('user');
        if (!userCookie) throw new Error('No user data found');

        const userData = JSON.parse(userCookie);
        const refreshToken = userData.refreshToken;

        if (refreshToken) {
          // Attempt to refresh token
          const response = await api.post('auth/refresh-token', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Update user data with new tokens
          const updatedUser = {
            ...userData,
            accessToken,
            refreshToken: newRefreshToken || refreshToken,
          };

          // Store updated user data
          Cookies.set('user', JSON.stringify(updatedUser), {
            expires: 7, // days
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear user cookie and redirect
        Cookies.remove('user');
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const token = localStorage.getItem('access_token') || '';

const api = axios.create({
  baseURL: 'https://api.example.com' || 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// api.interceptors.response.use((response) => response, async (error) => {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     // eslint-disable-next-line no-underscore-dangle
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();
//     axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.provide('axios', axios);
  app.provide('api', api);
});

export { api };

import axios from "axios";

export const apiDeTools = axios.create({
  baseURL: import.meta.env.VITE_DE_TOOLS_API,
  timeout: 10000,
  headers: {
    'accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

apiDeTools.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


import axios from "axios";

export const apiDeTools = axios.create({
  baseURL: import.meta.env.VITE_DE_TOOLS_API,
  timeout: 10000,
  headers: {
    'accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

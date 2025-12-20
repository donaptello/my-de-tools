import axios from "axios";

export const apiDeTools = axios.create({
  baseURL: import.meta.env.VITE_DE_TOOLS_API,
  timeout: 10000,
});

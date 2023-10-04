import axios from "axios";
import { store } from "../store/store";

const authFetch = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

authFetch.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authFetch;

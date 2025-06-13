import axios from "axios";

const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const register = (formData) => API.post(`/api/auth/register`, formData);
export const login = (formData) => API.post(`/api/auth/login`, formData);

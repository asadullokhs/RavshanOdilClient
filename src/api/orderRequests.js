import axios from "axios";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

const token = JSON.parse(localStorage.getItem("token"));

export const getAllOrders = () => {
  return API.get(`/api/orders`);
};

export const getOneOrder = (id) => {
  return API.get(`/api/orders/${id}`);
};

export const createOrder = (formDate) => {
  return API.post(`/api/orders`, formDate, { headers: { token } });
};
export const deleteOrder = (id) => {
  return API.delete(`/api/orders/${id}`, { headers: { token } });
};
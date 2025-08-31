import axios from "axios";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

const token = JSON.parse(localStorage.getItem("token"));

export const getAllTickets = () => {
  return API.get(`/api/ticket`);
};

export const getOneTicket = (id) => {
  return API.get(`/api/ticket/${id}`);
};

export const createTicket = (formDate) => {
  return API.post(`/api/ticket`, formDate, { headers: { token } });
};
export const deleteTicket = (id) => {
  return API.delete(`/api/ticket/${id}`, { headers: { token } });
};

export const updateTicket = (id, formDate) => {
  return API.put(`/api/ticket/${id}`, formDate, { headers: { token } });
};

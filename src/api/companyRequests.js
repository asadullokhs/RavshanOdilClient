import axios from "axios";

const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

const token = JSON.parse(localStorage.getItem("token"));

export const getAllCompanies = () => {
  return API.get(`/api/company`);
};

export const getOneCompany = (id) => {
  return API.get(`/api/company/${id}`);
};

export const createCompany = (formDate) => {
  return API.post(`/api/company`, formDate, { headers: { token } });
};
export const deleteCompany = (id) => {
  return API.delete(`/api/company/${id}`, { headers: { token } });
};

export const updateCompany = (id, formDate) => {
  return API.put(`/api/company/${id}`, formDate, { headers: { token } });
};

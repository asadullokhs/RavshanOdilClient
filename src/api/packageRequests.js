import axios from "axios";

const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

const token = JSON.parse(localStorage.getItem("token"));

export const getAllPackages = () => {
  return API.get(`/api/package`);
};

export const getOnePackage = (id) => {
  return API.get(`/api/packages/${id}`);
};

export const createPackage = (formDate) => {
  return API.post(`/api/package`, formDate, { headers: { token } });
};
export const deletePackage = (id) => {
  return API.delete(`/api/package/${id}`, { headers: { token } });
};

export const updatePackage = (id, formDate) => {
  return API.put(`/api/package/${id}`, formDate, { headers: { token } });
};

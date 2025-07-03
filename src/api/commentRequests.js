import axios from "axios";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

const token = JSON.parse(localStorage.getItem("token"));

export const getAllComments = () => {
  return API.get(`/api/comments`);
};

export const getOneComment = (id) => {
  return API.get(`/api/comments/${id}`);
};
export const getPackageComment = (packageId) => {
  return API.get(`/api/package/${packageId}`);
};

export const createComment = (formDate) => {
  return API.post(`/api/comments`, formDate, { headers: { token } });
};
export const deleteComment = (id) => {
  return API.delete(`/api/comments/${id}`, { headers: { token } });
};

export const updateComment = (id, formDate) => {
  return API.put(`/api/comments/${id}`, formDate, { headers: { token } });
};

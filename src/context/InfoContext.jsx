import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAllPackages } from "../api/packageRequests";
import { getAllCompanies } from "../api/companyRequests";
import { getAllComments } from "../api/commentRequests";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("profile")) || null
  );

  const [packages, setPackages] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

  // ✅ Combined fetch for better performance
  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [pkgRes, compRes, commentRes] = await Promise.all([
        getAllPackages(),
        getAllCompanies(),
        getAllComments()
      ]);

      setPackages(pkgRes?.data?.packages || []);
      setCompanies(compRes?.data?.companies || []);
      setComments(commentRes?.data?.comments || []);
    } catch (err) {
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [isRender, fetchInitialData]);

  // ✅ Separate function to refresh comments when needed
  const fetchComments = useCallback(async () => {
    try {
      const { data } = await getAllComments();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  }, []);

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    packages,
    setPackages,
    companies,
    setCompanies,
    comments,
    setComments,
    fetchComments,
    loading,
    setLoading,
    currentUser,
    setCurrentUser,
    exit,
    serverUrl,
    isRender,
    setIsRender,
  };

  return (
    <InfoContext.Provider value={value}>
      {children}
    </InfoContext.Provider>
  );
};
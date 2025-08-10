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

  const [data, setData] = useState({
    packages: [],
    companies: [],
    comments: [],
  });

  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

  const fetchInitialData = useCallback(async () => {
    // ✅ Only fetch if we don't already have data
    if (data.packages.length && data.companies.length && data.comments.length) {
      return;
    }

    setLoading(true);
    try {
      // ✅ Check sessionStorage cache
      const cachedData = sessionStorage.getItem("siteData");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const [pkgRes, compRes, commentRes] = await Promise.all([
        getAllPackages(),
        getAllCompanies(),
        getAllComments(),
      ]);

      const newData = {
        packages: pkgRes?.data?.packages || [],
        companies: compRes?.data?.companies || [],
        comments: commentRes?.data?.comments || [],
      };

      setData(newData);
      sessionStorage.setItem("siteData", JSON.stringify(newData)); // ✅ Cache for this session
    } catch (err) {
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  }, [data.packages.length, data.companies.length, data.comments.length]);

  useEffect(() => {
    fetchInitialData();
  }, [isRender, fetchInitialData]);

  const fetchComments = useCallback(async () => {
    try {
      const { data: res } = await getAllComments();
      setData(prev => ({
        ...prev,
        comments: res.comments || [],
      }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  }, []);

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    ...data,
    setPackages: (packages) => setData(prev => ({ ...prev, packages })),
    setCompanies: (companies) => setData(prev => ({ ...prev, companies })),
    setComments: (comments) => setData(prev => ({ ...prev, comments })),
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

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};
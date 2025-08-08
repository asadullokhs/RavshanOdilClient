import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllPackages } from "../api/packageRequests";
import { getAllCompanies } from "../api/companyRequests";
import { getAllComments } from "../api/commentRequests";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile") || null)
  );
  
  const [packages, setPackages] = useState([])
  const [companies, setCompanies] = useState([])
  const [comments, setComments] = useState([])

  const [loading, setLoading] = useState(false); // State for loading
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true); 
      try {
        const { data } = await getAllPackages();
        
        setPackages(data.packages);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchPackages();

    const fetchCompanies = async () => {
      setLoading(true); 
      try {
        const { data } = await getAllCompanies();
        
        setCompanies(data.companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchCompanies();
    const fetchComments = async () => {
      setLoading(true); 
      try {
        const { data } = await getAllComments();
        
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchComments();
  },[isRender]) 

  
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
    setHasRedirected(false);
  };

  const value = {
    packages,
    setPackages,
    loading,
    setLoading,
    currentUser,
    setCurrentUser,
    exit,
    serverUrl,
    isRender,
    setIsRender,
    companies,
    setCompanies,
    comments,
    setComments,
  };

  return (
    <InfoContext.Provider value={value}>
      {children}
    </InfoContext.Provider>
  );
};

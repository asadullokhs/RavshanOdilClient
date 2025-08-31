import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAllPackages } from "../api/packageRequests";
import { getAllCompanies } from "../api/companyRequests";
import { getAllComments } from "../api/commentRequests";
import { getAllTickets } from "../api/ticketRequests";

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
    tickets: [],
  });

  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const cachedData = sessionStorage.getItem("siteData");
      if (cachedData && !isRender) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const [pkgRes, compRes, commentRes, ticketRes] = await Promise.all([
        getAllPackages(),
        getAllCompanies(),
        getAllComments(),
        getAllTickets(),
      ]);

      const newData = {
        packages: pkgRes?.data?.packages || [],
        companies: compRes?.data?.companies || [],
        comments: commentRes?.data?.comments || [],
        tickets: ticketRes?.data?.tickets || [],
      };

      setData(newData);
      sessionStorage.setItem("siteData", JSON.stringify(newData));
    } catch (err) {
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
      setIsRender(false); // reset trigger after fetching
    }
  }, [isRender]);

  useEffect(() => {
    if (
      isRender ||
      !data.packages.length ||
      !data.companies.length ||
      !data.comments.length ||
      !data.tickets.length
    ) {
      fetchInitialData();
    }
  }, [isRender, fetchInitialData, data]);

  const fetchComments = useCallback(async () => {
    try {
      const { data: res } = await getAllComments();
      setData((prev) => ({
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
    setPackages: (packages) => setData((prev) => ({ ...prev, packages })),
    setCompanies: (companies) => setData((prev) => ({ ...prev, companies })),
    setComments: (comments) => setData((prev) => ({ ...prev, comments })),
    setTickets: (tickets) => setData((prev) => ({ ...prev, tickets })),
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

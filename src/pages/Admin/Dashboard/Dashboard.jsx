import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useInfoContext } from "../../../context/InfoContext";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  TeamOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import logo from "/logo.png";
import "./Dashboard.scss";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useInfoContext();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const exit = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    localStorage.removeItem("profile");
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      exit();
    }, 60 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Hamburger button visible only on mobile */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        <MenuOutlined />
      </button>

      <aside className="sidebar">
        {/* Close button only visible on mobile when sidebar is open */}
        <button
          className="close-btn"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        >
          <CloseOutlined />
        </button>

        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="brand-name">avshan Odil</span>
        </div>
        <nav className="nav-links">
          <NavLink
            end
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <UserOutlined /> Bosh sahifa
          </NavLink>
          <NavLink
            to="/admin/packagesDashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <AppstoreAddOutlined /> Paketlar
          </NavLink>
          <NavLink
            to="/admin/add"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <AppstoreAddOutlined /> Qo‘shish
          </NavLink>
          <NavLink
            to="/admin/order"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <ShoppingCartOutlined /> Buyurtmalar
          </NavLink>
          <NavLink
            to="/admin/comment"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <CommentOutlined /> Fikrlar
          </NavLink>
          <NavLink
            to="/admin/companies"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setSidebarOpen(false)}
          >
            <TeamOutlined /> Kompaniyalar
          </NavLink>
          <button
            className="logout"
            onClick={() => {
              exit();
              setSidebarOpen(false);
            }}
          >
            <LogoutOutlined /> Chiqish
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <p>
            <UserOutlined /> Xush kelibsiz, {currentUser?.username || "Admin"}
          </p>
          <button
            onClick={() => {
              exit();
              setSidebarOpen(false);
            }}
            className="logout-btn"
          >
            Chiqish
          </button>
        </header>

        <section className="outlet-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
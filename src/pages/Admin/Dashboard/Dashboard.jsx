import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useInfoContext } from "../../../context/InfoContext";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import logo from "/logo.png";
import "./Dashboard.scss";
import { useEffect } from "react";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useInfoContext();
  const navigate = useNavigate();

  const exit = () => {
    localStorage.removeItem("token"); // Or however you're storing auth
    setCurrentUser(null);
    localStorage.removeItem("profile"); // Or however you're storing auth
    navigate("/"); // Redirect to login
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      exit(); // logout after 1 hour
    }, 60 * 60 * 1000); // 1 hour

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="brand-name">avshan Odil</span>
        </div>
        <nav className="nav-links">
          <NavLink
            end
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <UserOutlined /> Bosh sahifa
          </NavLink>
          <NavLink
            to="/admin/packagesDashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AppstoreAddOutlined /> Paketlar
          </NavLink>
          <NavLink
            to="/admin/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AppstoreAddOutlined /> Qo‘shish
          </NavLink>
          <NavLink
            to="/admin/order"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ShoppingCartOutlined /> Buyurtmalar
          </NavLink>
          <NavLink
            to="/admin/comment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <CommentOutlined /> Fikrlar
          </NavLink>
          <NavLink
            to="/admin/companies"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <TeamOutlined /> Kompaniyalar
          </NavLink>
          <button className="logout" onClick={exit}>
            <LogoutOutlined /> Chiqish
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <p>
            <UserOutlined /> Xush kelibsiz, {currentUser?.username || "Admin"}
          </p>
          <button onClick={exit} className="logout-btn">
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

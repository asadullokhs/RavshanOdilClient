import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import logo from "../../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "ASOSIY" },
    { to: "/packages", label: "UMRA TO’PLAMLARI" },
    { to: "/about", label: "BIZ HAQIMIZDA" },
    { to: "/partners", label: "BIZNING HAMKORLAR" },
    { to: "/comment", label: "FIKR VA MULOHAZALR" },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <nav className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="right-side">
          <Link to="/contact" className="contact-button">
            Bog’lanish
          </Link>
          <MenuOutlined
            className="hamburger-icon"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        className="mobile-drawer"
        closeIcon={false}
      >
        <div className="drawer-links">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="drawer-link"
            >
              {label}
            </Link>
          ))}
        </div>
      </Drawer>
    </header>
  );
}

export default Navbar;

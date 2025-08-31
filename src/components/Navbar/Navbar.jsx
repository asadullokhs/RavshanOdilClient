import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.scss";
import logo from "../../assets/logo.png";

const navLinks = [
  { to: "/", label: "ASOSIY" },
  { to: "/packages", label: "UMRA TO’PLAMLARI" },
  { to: "/tickets", label: "CHIPTALAR" },
  { to: "/about", label: "BIZ HAQIMIZDA" },
  { to: "/partners", label: "BIZNING HAMKORLAR" },
  { to: "/comment", label: "FIKR VA MULOHAZALR" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: Contact + Hamburger */}
        <div className="right-side">
          <Link to="/contact" className="contact-button">
            Bog’lanish
          </Link>
          <MenuOutlined
            className="hamburger-icon"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') setOpen(true); }}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        className="mobile-drawer"
        closeIcon={false}
        width={280}
        drawerStyle={{ background: "#fff" }}
        bodyStyle={{ padding: "1rem" }}
      >
        <div className="drawer-header">
          <button
            className="drawer-close-button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="drawer-links" aria-label="Mobile navigation">
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
          <Link to="/contact" className="contact-button">
            Bog’lanish
          </Link>
        </nav>
      </Drawer>
    </header>
  );
}

export default React.memo(Navbar);
import React, { useState } from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("packages");
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    people: "Odamlar soni",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    if (activeTab === "packages") {
      navigate("/packages", { state: form });
    } else {
      navigate("/tickets", { state: form });
    }
  };

  return (
    <div className="hero-container">
      {/* Tabs */}
      <div className="hero-tabs">
        <button
          className={`hero-tab ${activeTab === "packages" ? "active" : ""}`}
          onClick={() => setActiveTab("packages")}
        >
          🏨 Paketlar
        </button>
        <button
          className={`hero-tab ${activeTab === "tickets" ? "active" : ""}`}
          onClick={() => setActiveTab("tickets")}
        >
          ✈️ Chiptalar
        </button>
      </div>

      {/* Title & Subtitle */}
      <h1 className="hero-title">
        {activeTab === "packages"
          ? "Sayohatingiz uchun eng yaxshi paketni toping"
          : "Eng qulay aviachiptalarni qidiring"}
      </h1>
      <p className="hero-subtitle">
        {activeTab === "packages"
          ? "Umra va tur paketlar bo‘yicha maxsus takliflar"
          : "Eng qulay narxlarda chiptalarni toping"}
      </p>

      {/* Search form */}
      <div className="search-bar">
        {activeTab === "packages" ? (
          <>
            <input
              type="text"
              name="to"
              placeholder="Yo‘nalish (masalan, Makka)"
              value={form.to}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <input
              type="number"
              name="people"
              placeholder="Odamlar soni"
              value={form.people}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="from"
              placeholder="Qayerdan"
              value={form.from}
              onChange={handleChange}
            />
            <input
              type="text"
              name="to"
              placeholder="Qayerga"
              value={form.to}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </>
        )}
        <button className="search-btn" onClick={handleSearch}>
          Qidirish
        </button>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <h1 className="hero-title">Sayohatingizni boshlang</h1>
        <p className="hero-subtitle">
          Oson qidiruv, eng qulay paket va chiptalar
        </p>

        <div className="hero-actions">
          <div
            className="hero-card packages-card"
            onClick={() => navigate("/packages")}
          >
            <span className="hero-icon">🏨</span>
            <p>Paketlarni ko‘rish</p>
          </div>
          <div
            className="hero-card tickets-card"
            onClick={() => navigate("/tickets")}
          >
            <span className="hero-icon">✈️</span>
            <p>Chipta qidirish</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
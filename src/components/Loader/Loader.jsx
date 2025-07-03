import React from "react";
import { FaPlane, FaKaaba } from "react-icons/fa";
import "./Loader.scss";

const FlightLoader = () => {
  return (
    <div className="umrah-loader">
      <div className="journey-container">
        <FaPlane className="plane-icon" />
        <div className="progress-track">
          <div className="progress-bar"></div>
        </div>
        <FaKaaba className="kaaba-icon" />
      </div>
    </div>
  );
};

export default FlightLoader;
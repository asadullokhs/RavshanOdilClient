// src/pages/Partners.jsx
import React, { useEffect, useState } from "react";
import "./Partners.scss";
import { useInfoContext } from "../../context/InfoContext";

const Partners = () => {
  const {companies} = useInfoContext();

  return (
    <section className="partners-page">
      <h1 className="partners-title">BIZNING HAMKORLAR</h1>
      <div className="partners-grid">
        {companies.map((company) => (
          <div className="partner-card" key={company._id}>
            <img src={company.logo.url} alt={company.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
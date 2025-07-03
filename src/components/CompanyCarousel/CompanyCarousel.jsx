import React from "react";
import "./CompanyCarousel.scss";

const CompanyCarousel = ({ companies }) => {
  const duplicated = [...companies, ...companies, ...companies]; // Repeat 3x

  return (
    <div className="company-carousel">
      <div className="scroll-track">
        {duplicated.map((company, index) => (
          <div className="company-logo" key={index}>
            <img src={company.logo?.url} alt={company.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCarousel;
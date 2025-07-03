import React from "react";
import Slider from "react-slick";
import "./Hero.scss";
import { useInfoContext } from "../../context/InfoContext";

const Hero = () => {
  const { packages } = useInfoContext();

  // Get only 4 cheapest packages
  const sortedPackages = [...packages]
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="hero-container">
      <Slider {...settings}>
        {sortedPackages.map((item, index) => (
          <div key={index} className="hero-slide">
            <div className="hero-content">
              <div className="hero-text">
                <img src={item.company.logo.url} alt="logo" className="hero-logo" />
                <h1 className="hero-title">{item.name}</h1>
                <p className="hero-description">
                  {item.details?.slice(0, 140)}...
                </p>
                <div className="hero-buttons">
                  <a href={`/packages/${item._id}`} className="hero-btn-primary">
                    Batafsil
                  </a>
                  <a href="#contact" className="hero-btn-secondary">
                    Bog’lanish
                  </a>
                </div>
              </div>
              <div className="hero-image-wrapper">
                <img
                  src={item.photo?.url || "/fallback.jpg"}
                  alt="umra"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
import React, { useMemo } from "react";
import Slider from "react-slick";
import "./Hero.scss";
import { useInfoContext } from "../../context/InfoContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { packages } = useInfoContext();

  const sortedPackages = useMemo(() => {
    return [...packages]
      .sort((a, b) => a.price - b.price)
      .slice(0, 4);
  }, [packages]);

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
                <img
                  src={item.company.logo.url}
                  alt="logo"
                  className="hero-logo"
                  loading="lazy"
                />
                <h1 className="hero-title">{item.name}</h1>
                <p className="hero-description">{item.details?.slice(0, 140)}...</p>
                <div className="hero-buttons">
                  <a href={`/package/${item._id}`} className="hero-btn-primary">
                    Batafsil
                  </a>
                  <Link to="/contact" className="hero-btn-secondary">
                    Bog’lanish
                  </Link>
                </div>
              </div>
              <div className="hero-image-wrapper">
                <img
                  src={item.photo?.url || "/fallback.jpg"}
                  alt="umra"
                  className="hero-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(Hero);
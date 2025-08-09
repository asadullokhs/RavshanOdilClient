import React, { useMemo } from "react";
import Slider from "react-slick";
import { useInfoContext } from "../../context/InfoContext";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./PackageCarousel.scss";

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick} role="button" tabIndex={0} aria-label="Previous slide" onKeyPress={e => e.key === 'Enter' && onClick()}>
    <LeftOutlined />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick} role="button" tabIndex={0} aria-label="Next slide" onKeyPress={e => e.key === 'Enter' && onClick()}>
    <RightOutlined />
  </div>
);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const PackageCarousel = () => {
  const { packages } = useInfoContext();

  // Memoize packages with formatted dates to avoid repeated computations
  const packagesWithFormattedDates = useMemo(() => {
    return packages.map(pkg => ({
      ...pkg,
      formattedDeparture: formatDate(pkg.departureDate),
      formattedReturn: formatDate(pkg.returnDate),
    }));
  }, [packages]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="packages-carousel">
      <h2 className="section-title">Umra Safari Tariflari</h2>
      <Slider {...settings}>
        {packagesWithFormattedDates.map((pkg) => (
          <div className="package-slide" key={pkg._id}>
            <div className="package-card">
              {pkg.company?.logo && (
                <img
                  src={pkg.company.logo.url}
                  alt={`${pkg.company.name} logo`}
                  className="company-logo"
                  loading="lazy"
                />
              )}
              <div className="main-img-wrapper">
                <img
                  src={pkg.photo.url}
                  alt={`Photo of ${pkg.name}`}
                  className="main-img"
                  loading="lazy"
                />
              </div>
              <div className="info">
                <div className="type">{pkg.type.toUpperCase()}</div>
                <div className="route">
                  {pkg.departureCity} ✈ {pkg.stopoverCities.join(" ✈ ")} ✈ {pkg.arrivalCity}
                </div>
                <div className="dates">
                  {pkg.formattedDeparture} – {pkg.formattedReturn}
                </div>
                <div className="seats">{pkg.seatsLeft} ta joy qoldi</div>
                <div className="progress-bar">
                  <div
                    className="fill"
                    style={{ width: `${(pkg.seatsLeft / 10) * 100}%` }}
                  />
                </div>
                <div className="price">
                  Narxi: <strong>{pkg.price}$</strong>
                </div>
                <Link to={`/package/${pkg._id}`}>
                  <button className="more-btn">Batafsil</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default React.memo(PackageCarousel);
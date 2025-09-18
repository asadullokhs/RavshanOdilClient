import React, { useMemo } from "react";
import Slider from "react-slick";
import { useInfoContext } from "../../context/InfoContext";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./PackageCarousel.scss";

// Custom navigation arrows
const CustomPrevArrow = ({ onClick }) => (
  <div
    className="custom-arrow prev"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label="Previous slide"
    onKeyPress={(e) => e.key === "Enter" && onClick()}
  >
    <LeftOutlined />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="custom-arrow next"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label="Next slide"
    onKeyPress={(e) => e.key === "Enter" && onClick()}
  >
    <RightOutlined />
  </div>
);

// Helper to format dates nicely
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const PackageCarousel = () => {
  const { packages } = useInfoContext();

  // ✅ Take only the latest 4 packages
  const latestPackages = useMemo(() => {
    return packages
      .map((pkg) => ({
        ...pkg,
        formattedDeparture: formatDate(pkg.departureDate),
        formattedReturn: formatDate(pkg.returnDate),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
      .slice(0, 4); // only 4 packages
  }, [packages]);

  const settings = {
    dots: false,
    infinite: latestPackages.length > 3, // loop only if more than 3
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: latestPackages.length > 3, // autoplay only if >3
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
      <h2 className="section-title">Oxirgi qo‘shilgan Umra safari tariflari</h2>

      {latestPackages.length === 0 ? (
        <p className="no-packages">Hozircha yangi paketlar mavjud emas</p>
      ) : (
        <Slider {...settings}>
          {latestPackages.map((pkg) => (
            <div className="package-slide" key={pkg._id}>
              <div className="package-card">
                {/* Company logo */}
                {pkg.company?.logo && (
                  <img
                    src={pkg.company.logo.url}
                    alt={`${pkg.company.name} logo`}
                    className="company-logo"
                    loading="lazy"
                  />
                )}

                {/* Main image */}
                <div className="main-img-wrapper">
                  <img
                    src={pkg.photo?.url}
                    alt={`Photo of ${pkg.name}`}
                    className="main-img"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="info">
                  <div className="type">{pkg.type?.toUpperCase()}</div>
                  <div className="route">
                    {pkg.departureCity} ✈{" "}
                    {pkg.stopoverCities?.join(" ✈ ") || "To‘g‘ridan-to‘g‘ri"} ✈{" "}
                    {pkg.arrivalCity}
                  </div>
                  <div className="dates">
                    {pkg.formattedDeparture} – {pkg.formattedReturn}
                  </div>
                  <div className="seats">{pkg.seatsLeft} ta joy qoldi</div>

                  {/* Progress bar for seats */}
                  <div className="progress-bar">
                    <div
                      className="fill"
                      style={{
                        width: `${Math.max(
                          10,
                          Math.min((pkg.seatsLeft / 10) * 100, 100)
                        )}%`,
                      }}
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
      )}
    </section>
  );
};

export default React.memo(PackageCarousel);
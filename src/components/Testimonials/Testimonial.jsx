import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import { useInfoContext } from "../../context/InfoContext";
import defaultAvatar from "../../assets/user.png";
import "./Testimonials.scss";

const TestimonialCarousel = () => {
  const { comments } = useInfoContext();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = useCallback((index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="testimonial-carousel">
      <h2 className="title">FIKR VA MULOHAZALAR</h2>
      <Slider {...settings} className="slider">
        {comments?.map((item, i) => {
          const isLong = item.comment.length > 200;
          const isExpanded = expanded[i];
          const displayed = isExpanded ? item.comment : item.comment.slice(0, 200);

          return (
            <div className="testimonial-card" key={i}>
              <div className="user-info">
                <img src={defaultAvatar} alt="User avatar" loading="lazy" />
                <h4>{item.fullName}</h4>
              </div>
              <p className="comment-text">
                {displayed}
                {isLong && (
                  <span
                    className="see-more"
                    onClick={() => toggleExpand(i)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") toggleExpand(i);
                    }}
                  >
                    {isExpanded ? "Yopish" : "Ko‘proq ko‘rish"}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default React.memo(TestimonialCarousel);
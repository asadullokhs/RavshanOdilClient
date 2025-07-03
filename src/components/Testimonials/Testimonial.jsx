import React from "react";
import Slider from "react-slick";
import "./Testimonials.scss";
import { useInfoContext } from "../../context/InfoContext";
import defaultAvatar from "../../assets/umrah2.png"; // fallback image

const TestimonialCarousel = () => {
  const { comments } = useInfoContext();

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonial-carousel">
      <h2 className="title">FIKR VA MULOHALAR</h2>
      <Slider {...settings} className="slider">
        {comments.map((item, i) => (
          <div className="testimonial-card" key={i}>
            <div className="user-info">
              <img src={defaultAvatar} alt="User" />
              <h4>{item.fullName}</h4>
            </div>
            <p className="comment-text">
              {item.comment.length > 200 ? item.comment.slice(0, 200) + "..." : item.comment}
            </p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialCarousel;
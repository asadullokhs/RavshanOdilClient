import React, { Suspense, lazy } from "react";
import "./Home.scss";
import { useInfoContext } from "../../context/InfoContext";
import Hero from "../../components/Hero/Hero";
import PackageCarousel from "../../components/PackageCarousel/PackageCarousel";

const CompanyCarousel = lazy(() =>
  import("../../components/CompanyCarousel/CompanyCarousel")
);

const TestimonialCarousel = lazy(() =>
  import("../../components/Testimonials/Testimonial")
);

const Home = () => {
  const { companies } = useInfoContext();

  return (
    <div className="home-container">
      <Hero />

      {companies?.length > 0 && (
        <Suspense fallback={null}>
          <CompanyCarousel companies={companies} />
        </Suspense>
      )}
      <PackageCarousel />

      <Suspense fallback={null}>
        <TestimonialCarousel />
      </Suspense>
    </div>
  );
};

export default Home;

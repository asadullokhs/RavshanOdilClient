import CompanyCarousel from '../../components/CompanyCarousel/CompanyCarousel';
import Hero from '../../components/Hero/Hero';
import PackageCarousel from '../../components/PackageCarousel/PackageCarousel';
import "./Home.scss";
import TestimonialCarousel from '../../components/Testimonials/Testimonial';
import { useInfoContext } from '../../context/InfoContext';

const Home = () => {
  const { companies } = useInfoContext();
  return (
    <div>
      <Hero />
       <CompanyCarousel companies={companies} />
        <PackageCarousel />
        <TestimonialCarousel/>

      {/* Add other sections here */}
    </div>
  );
};

export default Home;
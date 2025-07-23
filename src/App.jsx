import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Packages from './pages/Packages/Packages';
import About from './pages/About/About';
import Partners from './pages/Partners/Partners';
import Contact from './pages/Contact/Contact';
import { useInfoContext } from './context/InfoContext';
import FlightLoader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import OnePackage from './pages/OnePackage/OnePackage';
import Comment from './pages/Comments/Comment';
import AdminLogin from './pages/AdminLogin/AdminLogin';

const App = () => {
  const { loading } = useInfoContext();
  const location = useLocation();

  const noLayoutRoutes = ['/adminLogin']; // Routes that should not show Navbar/Footer
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  if (loading) {
    return (
      <div className="screen">
        <FlightLoader />
      </div>
    );
  }

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/package/:id" element={<OnePackage />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
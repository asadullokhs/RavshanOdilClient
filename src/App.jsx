import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Home from './pages/Home/Home';
import Packages from './pages/Packages/Packages';
import About from './pages/About/About';
import Partners from './pages/Partners/Partners';
import Videos from './pages/Videos/Video';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
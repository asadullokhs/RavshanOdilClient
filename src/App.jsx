import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useInfoContext } from "./context/InfoContext";
import FlightLoader from "./components/Loader/Loader";

// Core components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CompaniesDashboard from "./pages/Admin/CompaniesDashboard/CompaniesDashboard";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Packages = lazy(() => import("./pages/Packages/Packages"));
const About = lazy(() => import("./pages/About/About"));
const Partners = lazy(() => import("./pages/Partners/Partners"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const OnePackage = lazy(() => import("./pages/OnePackage/OnePackage"));
const Comment = lazy(() => import("./pages/Comments/Comment"));
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const Tickets = lazy(() => import("./pages/Tickets/Tickets"));

// Lazy-load admin dashboard and subpages
const Dashboard = lazy(() => import("./pages/Admin/Dashboard/Dashboard"));
const Welcome = lazy(() => import("./pages/Admin/Welcome/Welcome"));
const PackagesDashboard = lazy(() =>
  import("./pages/Admin/PackagesDashboard/PackagesDashboard")
);
const AddPackage = lazy(() => import("./pages/Admin/AddPackage/AddPackage"));
const Orders = lazy(() => import("./pages/Admin/Orders/Orders"));
const CommentDashboard = lazy(() =>
  import("./pages/Admin/CommentDashboard/CommentDashboard")
);

const App = () => {
  const { loading } = useInfoContext();
  const location = useLocation();

  // Routes without Navbar & Footer
  const noLayoutRoutes = [
    "/adminLogin",
    "/admin/dashboard",
    "/admin/packagesDashboard",
    "/admin/add",
    "/admin/order",
    "/admin/comment",
    "/admin/companies",
  ];
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
      <Suspense fallback={<FlightLoader />}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/package/:id" element={<OnePackage />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/tickets" element={<Tickets />} />

          {/* Admin */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Dashboard />}>
            <Route path="dashboard" element={<Welcome />} />
            <Route path="packagesDashboard" element={<PackagesDashboard />} />
            <Route path="add" element={<AddPackage />} />
            <Route path="order" element={<Orders />} />
            <Route path="comment" element={<CommentDashboard />} />
            <Route path="companies" element={<CompaniesDashboard />} />
          </Route>
        </Routes>
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
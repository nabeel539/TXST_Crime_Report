import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* User Routes */}
        {/* <Route element={<Layout />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
        </Route> */}

        {/* Admin Routes - Protected */}
        {/* <Route element={<Layout />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route> */}

        {/* Auth Route */}
        <Route path="/auth/*" element={<Layout />}>
          {/* <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} /> */}
        </Route>

        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

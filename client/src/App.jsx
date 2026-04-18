import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // din befintliga navbar
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminMessages from "./pages/Admin/AdminMessages";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminTranslations from "./pages/Admin/AdminTranslations";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/translations"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminTranslations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;   // ← OBS! Måste finnas
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/mvpblocks/footer-standard";
import Header2 from "./components/mvpblocks/header-2";
import { useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ui/ScrollToTop";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const CustomerDashboard = lazy(() => import("./pages/dashboard/CustomerDashboard"));
const OrganizerDashboard = lazy(() => import("./pages/dashboard/OrganizerDashboard"));
const CreateEvent = lazy(() => import("./pages/dashboard/CreateEvent"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Support = lazy(() => import("./pages/Support"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const QRScanner = lazy(() => import("./pages/dashboard/QRScanner"));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Global Toast Notification System */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#ffffff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header2 darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">Loading page...</p>
              </div>
            </div>
          }>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/thank-you" element={<ThankYou />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Customer Dashboard */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["customer", "attendee"]}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Organizer Dashboard */}
              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["organizer"]}>
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Scan Attendee QR Code */}
              <Route
                path="/organizer/scan/:eventId"
                element={
                  <ProtectedRoute allowedRoles={["organizer"]}>
                    <QRScanner />
                  </ProtectedRoute>
                }
              />

              {/* Create Event */}
              <Route
                path="/organizer/create-event"
                element={
                  <ProtectedRoute allowedRoles={["organizer"]}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />

              {/* Admin Dashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Pending Events Alias */}
              <Route
                path="/admin/pending-events"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback to 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

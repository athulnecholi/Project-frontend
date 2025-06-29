import React from "react";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import BrowseTurfs from "./Pages/BrowseTurfs";
import BookTurfs from "./Pages/BookTurfs";
import MyBookings from "./users/myBookings";
import UserDashboard from "./users/UserDashboard";
import ManagerDashboard from "./managers/ManagerDashboard";
import ViewTurf from "./Pages/ViewTurf";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import ProtectedRoute from "./assets/components/ProtectedRoutes";
import EditProfilePic from "./users/EditProfilePic";
import CreateTurfPage from "./managers/CreateTurf";
import BookingRequests from "./managers/BookingRequests";
import MyTurfs from "./managers/MyTurfs";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/turfs" element={<BrowseTurfs />} />
            <Route path="turfs/:id" element={<ViewTurf />} />
          </Route>

          {/* User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<EditProfilePic />} />
            <Route path="book/:turfId" element={<BookTurfs />} />
            
          </Route>

          {/* Manager Routes */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["manager", "admin"]}>
                <ManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="createturf" element={<CreateTurfPage />} />
            <Route path="bookingrequest" element={<BookingRequests />} />
            <Route path="my-turfs" element={<MyTurfs />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

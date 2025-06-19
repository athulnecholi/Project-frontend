import React from 'react'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import HomePage from './Pages/Home'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './index.css'
import BrowseTurfs from './Pages/BrowseTurfs'
import BookTurfs from './Pages/BookTurfs'
import MyBookings from './users/myBookings'
import UserDashboard from './users/userDashboard'
import ViewTurf from './Pages/ViewTurf'
import MainLayout from './layouts/MainLayout'
import UserLayout from './layouts/UserLayout'
import ProtectedRoute from './assets/components/ProtectedRoutes'
import EditProfilePic from './users/EditProfilePic'

function App() {
  return (
    <div>
      <Router>
        <Routes>

          {/*  Public routes under MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/turfs" element={<BrowseTurfs />} />
          </Route>

          {/*  Protected routes under UserLayout */}
          <Route
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/book/:turfId" element={<BookTurfs />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/bookings" element={<MyBookings />} />
            <Route path="/turfs/:id" element={<ViewTurf />} />
            <Route path="/user/profile" element={<EditProfilePic />} />

          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
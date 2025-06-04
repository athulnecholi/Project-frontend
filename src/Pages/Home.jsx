import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Turf Booking</h1>
        <p className="text-lg text-gray-600">Book your favorite turfs easily and instantly.</p>
        <div className="flex gap-4 justify-center">
          <a href="/Signin" className="btn btn-primary">Login</a>
          <a href="/Signup" className="btn btn-outline">Register</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

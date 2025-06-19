import React from 'react';
import { motion } from 'framer-motion';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-6 mt-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 drop-shadow-md">
          Play. Book. Repeat.
        </h1>
        <p className="text-xl text-gray-700 max-w-xl mx-auto italic">
          "Football is not just a game, it's an emotion. Book your turf and let the game begin!"
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/Signin" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition transform hover:scale-105">Login</a>
          <a href="/Signup" className="px-6 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition transform hover:scale-105">Register</a>
        </div>
      </motion.div>

      {/* Animation/Image Section */}
      <motion.div 
        className="mt-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img 
          src="/assets/мячи-ліги-націй-2024-min.jpg" 
          alt="Football Field"
          className="w-64 h-64 rounded-full shadow-xl object-cover border-4 border-white"
        />
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Turf Booking. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;

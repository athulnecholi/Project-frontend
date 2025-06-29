import Header from "../assets/components/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />

      {/* Video Background Container */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay + Content */}
        <div className="relative min-h-screen bg-black bg-opacity-60 p-4 text-white">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;

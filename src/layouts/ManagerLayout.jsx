import Header from "../assets/components/Header";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;

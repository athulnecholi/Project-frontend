import Header from "../assets/components/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4 bg-base-200">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;

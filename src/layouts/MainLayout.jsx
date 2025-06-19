import Header from "../assets/components/Header";
import Footer from "../assets/components/Footer";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div>
        <Header></Header>
        <main className="min-h-screen p-4">
         <Outlet />
        </main>
        <Footer />
      
    </div>
  )
}

export default MainLayout

import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar/navbar";
import Footer from "../components/footer/footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

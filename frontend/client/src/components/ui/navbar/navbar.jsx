import logo from "../../../assets/peak-logo.svg";
import Menu from "./menu";
//import { getDesignTokens } from "../../theme";

/* Banner
 <div className="bg-gray-800 text-gray-100 p-3 flex justify-content-between lg:justify-content-center items-center justify-center align-items-center flex-wrap">
        <div className=" ont-bold mr-8">🔥 Hot Deals!</div>
        <div className="align-items-center hidden lg:flex">
          <span className="line-height-3">
            Libero voluptatum atque exercitationem praesentium provident odit.
          </span>
        </div>
        <a className="flex align-items-center ml-2 mr-8">
          <span className="underline font-bold">Learn More</span>
        </a>
        <a
          className="flex items-center align-items-center no-underline justify-content-center border-circle text-100 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150"
          style={{ width: "2rem", height: "2rem" }}
        >
          <i className="pi pi-times"></i>
        </a>
      </div>
*/

export default function Navbar() {
  return (
    <div>
      <div className=" bg-gray-900 px-3 sm:px-6 py-3 flex items-center justify-end text-sm">
        <a
          href="#"
          className="text-white font-medium inline-flex align-items-center items-center cursor-pointer px-3 hover:text-gray-200"
        >
          <i className="pi pi-sign-in mr-2 sm:mr-3 text-sm"></i>
          <span>Sign In</span>
        </a>

        <span className="text-white">|</span>

        <a
          href="#"
          className="text-white font-medium inline-flex align-items-center items-center cursor-pointer px-3 hover:text-gray-200"
        >
          <i className="pi pi-user mr-2 sm:mr-3 text-sm"></i>
          <span>Create Account</span>
        </a>
      </div>
      <div
        className="flex relative justify-between min-h-[80px] items-center px-3 sm:px-6"
        style={{ color: "var(--surface-900)" }}
      >
        <div className="flex min-h-[80px] ">
          <img src={logo} className="mr-6 h-2rem sm:h-3rem" />
          <Menu />
        </div>
        <div className="flex items-center">
          <a href="#" className="flex items-center px-2 sm:px-3">
            <i className="pi pi-search mr-2" />
            <span>Search</span>
          </a>
          <a href="#" className="flex items-center px-2 sm:px-3">
            <i className="pi pi-heart mr-2" />
            <span>Favorites</span>
          </a>
          <a href="#" className="flex items-center px-2 sm:px-3">
            <i className="pi pi-shopping-cart mr-2" />
            <span>Cart</span>
          </a>
        </div>
      </div>
    </div>
  );
}

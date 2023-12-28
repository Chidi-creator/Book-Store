import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav className="bg-blue-500 p-4 relative w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Chidi Library
        </Link>
        {!user && (
          <div className="hidden md:flex space-x-4">
            <Link to="/user/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/user/signup" className="text-white hover:text-gray-300">
              Sign Up
            </Link>
          </div>
        )}

        {!user && (
          <div className=" md:hidden">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-white hover:text-gray-300 cursor-pointer">
                <RxHamburgerMenu />
              </span>
              {isHovered && <MobileMenu user={user} logout={logout} />}
            </div>
          </div>
        )}

        {user && (
          <div className="hidden md:flex gap-x-4">
            <Link to="" className="text-white hover:text-gray-300">
              {user.username}
            </Link>
            <h3
              to=""
              className="text-white hover:text-gray-300"
              onClick={logout}
            >
              Logout
            </h3>
          </div>
        )}

        {user && (
          <div className=" md:hidden">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>
              <RxHamburgerMenu className="text-white hover:text-gray-300 cursor-pointer text-xl" />
              {isHovered && <MobileMenu user={user} logout={logout} />}
              </span>
            

            
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

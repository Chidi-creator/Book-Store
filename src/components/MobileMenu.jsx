/* eslint-disable react/prop-types */
import { BiUserCircle } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

const MobileMenu = ({user, logout}) => {
  return (
    <div>
      {user ?  (<div className="absolute right-0 top-10 bg-white rounded-md">
        <ul className="">
            <li className="flex items-center gap-2 border border-gray-300 rounded-lg p-4">
                <BiUserCircle /> {user.username}
            </li>
            <li className="flex items-center gap-2 border border-gray-300 rounded-lg p-4"><FaPowerOff /> <span onClick={logout}>Logout</span></li>
        </ul>
      </div>):
      (<div className="absolute right-0 top-10 bg-white rounded-md">
      <ul className="">
          <Link to="user/login"><li className="flex items-center gap-2 border border-gray-300 rounded-lg p-4">
              <BiUserCircle /> Login
          </li></Link>
          <Link to="user/signup"><li className="flex items-center gap-2 border border-gray-300 rounded-lg p-4"> <IoMdCreate /> <span onClick={logout}>Sign Up</span></li> </Link> 
      </ul>
    </div>)
      
      }
    </div>
  );
};

export default MobileMenu;

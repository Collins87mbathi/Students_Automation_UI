import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createImageFromInitials } from "../Utils/getInitials";
import { getRandomColor } from "../Utils/getRandomColor";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../Redux/Slices/userSlice";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const user = useSelector((state) => state?.user.user);
  const dispatch = useDispatch();
  const handleNav = () => {
    setNav(!nav);
  };
  const Logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) return dispatch(logout());
  };

  
  return (
    <div className="mx-auto flex justify-between items-center max-w-4xl xl:max-w-6xl">
      <Link to="/">
        <h4 className="p-4 text-lg font-semibold hover:text-[#40AA54] text-[#16162E] active:text-[#40AA54] transition duration-500 focus:text-[#40AA54]">Student Automation</h4>
      </Link>
      <div className="flex flex-row items-center space-x-16">
        <ul className="hidden items-center flex-row md:flex">
          {user === null ? (
            <>
              <li>
                <Link
                  to="/register"
                  className="flex justify-center bg-[#40AA54] p-1 rounded-md  hover:bg-[#F7F7F7] border-2 gap-4 m-2 transition duration-500 active:text-neutral-500 text-center"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-[#40AA54] p-1 flex justify-center rounded-md hover:bg-[#F7F7F7] border-2 transition duration-500  text-neutral-900 active:text-neutral-500  gap-4 m-2"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <div className="relative h-max flex flex-row items-center">
              <li className="text-[18px] font-semibold cursor-pointer flex items-center">
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src={createImageFromInitials(
                    500,
                    user?.fullname,
                    getRandomColor()
                  )}
                  alt="img"
                />
                <h6 className="p-4 text-lg font-semiboldtext-[#16162E] transition duration-500 ">{user?.fullname}</h6>
              </li>
              <li className="p-4 hover:text-[#40AA54] text-[#16162E] active:text-[#40AA54] transition duration-500 focus:text-[#40AA54]">
                <AiOutlineLogout
                  onClick={() => {
                    Logout();
                  }}
                  className="cursor-pointer text-xl"
                />
              </li>
            </div>
          )}
        </ul>
      </div>

      {/* Mobile Nav Bar */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose className="cursor-pointer" size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <ul
        className={
          nav
            ? " flex flex-col items-center fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <Link to="/">
        <h4 className="p-4 text-lg font-semibold hover:text-[#40AA54] text-[#16162E] active:text-[#40AA54] transition duration-500 focus:text-[#40AA54]">Student Automation</h4>
        </Link>
        {user === null ? (
          <>
            <li>
              <Link
                to="/register"
                className="flex justify-center bg-[#40AA54] p-1 rounded-md  hover:bg-[#F7F7F7] border-2 gap-4 m-2 transition duration-500 active:text-neutral-500 text-center"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-[#40AA54] p-1 flex justify-center rounded-md hover:bg-[#F7F7F7] border-2 transition duration-500  text-neutral-900 active:text-neutral-500  gap-4 m-2"
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-[18px] font-semibold cursor-pointer flex items-center">
              <img
                className="w-[40px] h-[40px] rounded-[50%] object-cover"
                src={createImageFromInitials(
                  500,
                  user?.fullname,
                  getRandomColor()
                )}
                alt="img"
              />
            </li>
            <li className="p-4 hover:text-[#40AA54] text-[#16162E] active:text-[#40AA54] transition duration-500 focus:text-[#40AA54]">
              <AiOutlineLogout
                onClick={() => {
                  Logout();
                }}
                className="cursor-pointer text-[30px]"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
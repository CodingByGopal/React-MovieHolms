import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import image from "../../images/logo.png";

const Navbar = () => {
  const activeClassName = "border-b-2 border-red-500";
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const linkList = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
    {
      name: "People",
      path: "/people",
    },
    {
      name: "Search",
      path: "/search",
    },
    {
      name: "Developer",
      path: "/developer",
    },
  ];

  // navbar show and hide based on scroll
  const changeBackground = () => {
    if (window.scrollY >= 88) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div
      className={`  fixed w-full top-0 left-0    z-30 ${
        open ? "opacity-100  " : ""
      } ${
        navbar
          ? " bg-[#121212]  shadow-2xl shadow-black transition-all duration-150"
          : " "
      } `}
    >
      <div className=" max-w-screen-2xl mx-auto md:flex py-4 lg:px-10 px-4 items-center justify-between">
        <Link to="/">
          <img src={image} alt="logo" className=" lg:h-14 h-12 " />
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute  right-8 top-6 z-40 cursor-pointer md:hidden text-gray-50 "
        >
          {open ? (
            <i title="close" className="fa-solid fa-xmark"></i>
          ) : (
            <i title="menu" className="fa-solid fa-bars"></i>
          )}
        </div>

        <ul
          className={`flex items-center  flex-col md:flex-row md:pb-0  pb-12 absolute md:static top-0 h-screen md:h-0 md:justify-start justify-center  md:z-auto left-0 w-full md:w-auto transition-all duration-150  ${
            open
              ? " opacity-100  bg-[#121212]  transition-all duration-300  "
              : " md:opacity-100 opacity-0 md:translate-x-0 translate-x-full invisible md:visible pointer-events-none md:pointer-events-auto"
          }`}
        >
          {linkList?.map((link) => {
            return (
              <li
                key={link?.name}
                className={` px-4 md:px-0 md:py-0 md:rounded-none py-1 rounded-full   
                   md:ml-8 md:my-0 my-5  md:text-gray-50    transition duration-200  ${
                     open ? " text-xl md:text-base " : "text-base  "
                   } `}
              >
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "border-b-2 border-b-transparent hover:border-b-red-600 "
                  }
                  to={link?.path}
                >
                  {link?.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

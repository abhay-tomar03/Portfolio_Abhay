/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import Notification from "./Notification";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/logo3.png";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });
  const handleClick = () => setNav(!nav);
  const handleNotificationClose = () =>
    setNotification({ message: "", type: "info" });

  return (
    <nav
      className={`fixed w-full h-[60px] md:h-[80px] flex justify-between items-center px-2 sm:px-4 md:px-6 ${isDark ? "bg-[#0a192f]" : "bg-white border-b border-gray-100"} ${isDark ? "text-gray-300" : "text-gray-700"} z-50`}
    >
      <div>
        <img
          src={Logo}
          alt="Portfolio Logo"
          style={{ width: "120px", mdWidth: "150px", marginTop: "8px" }}
        />
      </div>

      {/* menu */}
      <ul className="hidden md:flex text-sm lg:text-base" role="navigation">
        <li>
          <Link to="home" smooth={true} duration={500} role="menuitem">
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500} role="menuitem">
            About
          </Link>
        </li>
        <li>
          <Link to="skills" smooth={true} duration={500} role="menuitem">
            Skills
          </Link>
        </li>
        <li>
          <Link to="experience" smooth={true} duration={500} role="menuitem">
            Experience
          </Link>
        </li>
        <li>
          <Link to="work" smooth={true} duration={500} role="menuitem">
            Work
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500} role="menuitem">
            Contact
          </Link>
        </li>
      </ul>

      {/* Theme Toggle + Hamburger */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold text-xs lg:text-sm ${isDark ? "text-yellow-400" : "text-gray-800"}`}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border-2 ${isDark ? "bg-yellow-400 text-gray-900 border-yellow-400" : "bg-gray-800 text-yellow-400 border-gray-800"} transition-colors duration-300 shadow-lg`}
            aria-label="Toggle dark/light mode"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
        <a
          href="/resume.pdf"
          download
          className={`px-3 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-colors duration-300 shadow border-2 ${isDark ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 hover:scale-105" : "bg-white text-rose-500 border-rose-500 hover:bg-rose-100 hover:scale-105"}`}
          style={{ textDecoration: "none" }}
          aria-label="Download Resume PDF"
          onClick={(e) => {
            try {
              setNotification({
                message: "Resume download started!",
                type: "success",
              });
            } catch (err) {
              setNotification({
                message: "Resume download failed. Please try again.",
                type: "error",
              });
            }
          }}
        >
          Download Resume
        </a>
        <button
          onClick={handleClick}
          className="md:hidden cursor-pointer z-10"
          aria-label="Toggle mobile menu"
          aria-expanded={nav}
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Notification */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : `absolute top-0 left-0 w-full h-screen ${isDark ? "bg-[#0a192f]" : "bg-gray-100"} flex flex-col justify-center items-center`
        }
      >
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <Link onClick={handleClick} to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <Link onClick={handleClick} to="skills" smooth={true} duration={500}>
            Skills
          </Link>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <Link
            onClick={handleClick}
            to="experience"
            smooth={true}
            duration={500}
          >
            Experience
          </Link>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <Link onClick={handleClick} to="work" smooth={true} duration={500}>
            Work
          </Link>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <Link onClick={handleClick} to="contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Social icons */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul role="navigation" aria-label="Social media links">
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300 hover:text-white transition"
              href="https://www.linkedin.com/in/abhay-tomar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300 hover:text-white transition"
              href="https://github.com/abhay-tomar03"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]">
            <a
              className="flex justify-between items-center w-full text-gray-300 hover:text-white transition"
              href="mailto:abhay.tomar5670@gmail.com"
              aria-label="Send email"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]">
            <a
              className="flex justify-between items-center w-full text-gray-300 hover:text-white transition"
              href="https://bit.ly/3LJERs3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

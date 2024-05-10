import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Insightify.png"
import Clerk from "./Clerk";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={Logo} alt="Insightify" />
        </div>
        <div className="site-name">
        Insightify
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/faq">FAQ's</Link>
        <Link to="/about">About</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Clerk />
      </div>
    </div>
  );
};

export default Navbar;

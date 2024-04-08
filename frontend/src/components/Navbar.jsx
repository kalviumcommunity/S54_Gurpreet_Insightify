import React from 'react'
import { Link } from "react-router-dom";
import './Home.css'
const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-left">INSIGHTIFY</div>
        <div className="navbar-right">
          <Link to="/discover">Discover</Link>
          <Link to="/community">Community</Link>
          <Link to="/about">About Us</Link>
          <Link to="/testimonials">Testimonials</Link>
        </div>
      </div>
  )
}

export default Navbar
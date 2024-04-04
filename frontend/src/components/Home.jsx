import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Image from "../assets/Home Image.png";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="left">
          <div className="survey">Survey Maker</div>
          <div className="bold">
            Reveal Hidden <br /> Wisdom Through Survey
          </div>
          <div className="insight">Insight</div>
          <div className="tryfree">
            Create surveys that encourage people to share more with you. Try for
            free.
          </div>
          <div className="create">
            <button id="create-btn">Create Now</button>
          </div>
        </div>
        <div className="right">
          <img src={Image} alt="home" />
        </div>
      </div>
    </div>
  );
};

export default Home;

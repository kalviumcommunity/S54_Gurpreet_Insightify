import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import FAQ from "./FAQ";
import Footer from "./Footer";



const Home = () => {
  return (
    <div className="home">
      <div className="nav-container">
      <Navbar />
      </div>
      <div className="body-container">
        <div className="body-text">
          <div className="body-text-container">Gathering data is <span>hard</span> easy</div>
          <div className="body-text-container2">No worries, we got you covered😎</div>
        </div>
        <div className="getStartedbtn"><button>Get Started</button></div>
      </div>
      <div className="FAQS">
        <FAQ />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

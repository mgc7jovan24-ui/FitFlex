import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>
          Transform Your Body with <span>MGC FITZZ</span>
        </h1>
        <p>
          Your ultimate fitness companion — discover exercises, track your
          progress, and unlock your true potential.
        </p>
        <button className="view-more">view more</button>
      </div>
    </div>
  );
};

export default Hero;

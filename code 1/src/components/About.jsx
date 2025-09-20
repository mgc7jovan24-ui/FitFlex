import React from "react";
import aboutImg from "../assets/ChatGPT Image Sep 17, 2025, 11_58_52 AM.png"; // make sure filename matches exactly!
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2>About <span>MGC FITZZ</span></h2>
          <p>
            At <b>MGC FITZZ</b>, we believe fitness is not just about lifting weights — 
            it’s about building strength, confidence, and a lifestyle. 
            Our platform helps you explore exercises, discover workout routines, 
            and stay motivated on your journey to becoming the best version of yourself.
          </p>
          <p>
            Whether you’re a beginner or a pro athlete, MGC FITZZ is your 
            ultimate companion for workouts, health, and transformation.
          </p>
        </div>

        <div className="about-image">
          <img src={aboutImg} alt="About MGC FITZZ" />
        </div>
      </div>
    </section>
  );
};

export default About;

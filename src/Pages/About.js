// src/Pages/About.js
import React from "react";
import "../Styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Revival Springs Joy Of Love Church</h1>
        <p>
          Welcome to the Youth Department of Revival Springs Joy Of Love Church, 
          located in the heart of Mombasa. We are a vibrant, Christ-centered 
          community led by Apostle Remmy Nyamweya, dedicated to raising the 
          next generation of leaders rooted in faith, unity, and service.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To empower young people through the Word of God, discipleship, 
            and mentorship, equipping them to serve in the church and 
            transform society.
          </p>
        </div>
        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To see a generation of youth who are bold in faith, innovative in 
            ideas, and united in love, creating lasting impact in their 
            communities and beyond.
          </p>
        </div>
        <div className="card">
          <h2>Our Core Values</h2>
          <ul>
            <li>Faith in God</li>
            <li>Unity & Fellowship</li>
            <li>Leadership & Responsibility</li>
            <li>Service & Love</li>
          </ul>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="leadership">
        <h2>Our Leadership</h2>
        <div className="leaders">
          <div className="leader-card">
            <img src="https://i.ibb.co/W4cBJfSs/silent.png" alt="Apostle Remmy Nyamweya" />
            <h3>Apostle Remmy Nyamweya</h3>
            <p>Senior Pastor & Founder</p>
          </div>
          <div className="leader-card">
            <img src="https://i.ibb.co/W4cBJfSs/silent.png" alt="Youth Leader" />
            <h3>E</h3>
            <p>Youth Department Leader</p>
          </div>
          <div className="leader-card">
            <img src="https://i.ibb.co/W4cBJfSs/silent.png" alt="Choir Leader" />
            <h3>Silent Wolf</h3>
            <p>Choir & Worship Coordinator</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

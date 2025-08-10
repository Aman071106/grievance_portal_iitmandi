import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Your Voice Matters</h1>
        <p className="hero-subtitle">The Grievance Portal for a Better Tomorrow</p>
        <button className="hero-button">File a Grievance</button>
      </div>
    </div>
  );
};

export default Hero;

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="hero section-padding">
      <div className="container hero-container animate-on-scroll">
        <div className="hero-content">
          <div className="availability-badge glass rounded-pill">
            <span className="status-dot pulse"></span>
            Available for new opportunities
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Pavan Jabu</span><br />
            <span className="subtitle-small">Frontend Developer <br />& UI Designer</span>
          </h1>
          <p className="hero-subtitle">
            I design and build modern, scalable web experiences with a focus on UI/UX and performance. Bringing ideas to life through code and design.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary glass">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <img
            src="/Images/IMG_3698-Photoroom (1).png"
            alt="Pavan Jabu - Frontend Developer"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

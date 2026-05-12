import React from 'react';

const About = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="container animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="title-line"></div>
        </div>
        <div className="about-grid">
          <div className="about-text glass card-padding rounded-xl">
            <p>I am a frontend developer with experience in building admin dashboards, modern websites, and UI systems.</p>
            <p>I specialize in React.js, Figma design, and creating seamless user experiences that bridge the gap between aesthetics and functionality. Based in Hyderabad, India, I am passionate about delivering intuitive digital solutions.</p>
            <hr className="divider" />
            <div className="stats-grid">
              <div className="stat-box">
                <h3>2+</h3>
                <span>Years Experience</span>
              </div>
              <div className="stat-box">
                <h3>15+</h3>
                <span>Projects Done</span>
              </div>
              <div className="stat-box">
                <h3>100%</h3>
                <span>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

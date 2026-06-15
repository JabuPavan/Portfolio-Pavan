import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useVisitorTracking } from './hooks/useVisitorTracking';

const Portfolio = () => {
  useScrollAnimation();
  useVisitorTracking(); // Initialize visitor tracking here

  return (
    <>
      <div className="bg-orb orb-top"></div>
      <div className="bg-orb orb-bottom"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;

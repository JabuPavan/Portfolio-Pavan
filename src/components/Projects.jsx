import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'S16 Design Studio',
    role: 'UI/UX Design & Development',
    problem: 'Required a premium, creative portfolio for a design studio to showcase high-end visual work.',
    solution: 'Built a sleek, modern website with smooth transitions, interactive elements, and a focus on visual impact.',
    tech: ['React.js', 'Framer Motion', 'CSS'],
    link: 'https://s16-design-studio.vercel.app',
    linkLabel: 'View Live Site',
  },
  {
    title: 'Civil Tech Website',
    role: 'UI Design & Frontend Development',
    problem: 'Needed a professional online presence to showcase civil engineering services and projects.',
    solution: 'Developed a fast, responsive website with clear service offerings and project galleries focusing on conversion.',
    tech: ['React.js', 'CSS', 'HTML'],
    link: 'https://www.civiltechconchem.com/',
    linkLabel: 'View Live Site',
  },
  {
    title: 'Field Chef Website',
    role: 'UI/UX Designer',
    problem: 'Required a modern interface for a chef services platform to elevate brand perception.',
    solution: 'Created a high-fidelity Figma prototype with premium aesthetics, refined typography, and spatial balance.',
    tech: ['Figma', 'Prototyping'],
    link: 'https://field-chef-49336011.figma.site',
    linkLabel: 'View Figma Prototype',
  },
  {
    title: 'Cycle Tray Website',
    role: 'UI/UX Designer',
    problem: 'Needed an engaging, product-focused UI for a premium cycling product platform.',
    solution: 'Designed a dynamic and clean user interface focusing heavily on product presentation and user flow.',
    tech: ['Figma', 'Design System'],
    link: 'https://cycle-tray-49996514.figma.site',
    linkLabel: 'View Figma Prototype',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects section-padding">
      <div className="container animate-on-scroll">
        <div className="section-header align-center">
          <h2 className="section-title">Selected Case Studies</h2>
          <p className="section-subtitle">A look into my recent design and development projects.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card glass rounded-xl">
              <div className="project-content card-padding">
                <h3 className="project-title">{project.title}</h3>
                <div className="role-tag">{project.role}</div>
                <div className="project-details">
                  <p><strong>Problem:</strong> {project.problem}</p>
                  <p><strong>Solution:</strong> {project.solution}</p>
                </div>
                <div className="tech-stack-mini">
                  {project.tech.map((t, j) => <span key={j}>{t}</span>)}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="btn-text">
                  {project.linkLabel} <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Pavilion Infra',
    role: 'UI/UX Design & Development',
    problem: 'Required a robust and professional online presence for a construction company.',
    solution: 'Built a reliable website showcasing infrastructure projects, services, and company expertise.',
    tech: ['React.js', 'CSS', 'HTML'],
    link: 'https://pavilioninfra.com',
    linkLabel: 'View Live Site',
  },
  {
    title: 'Harrof',
    role: 'UI/UX Design & Development',
    problem: 'Needed an elegant and premium website for an interior design company.',
    solution: 'Designed and developed a visually appealing portfolio focusing on aesthetics and user experience.',
    tech: ['React.js', 'CSS', 'Framer Motion'],
    link: 'https://harrof.com',
    linkLabel: 'View Live Site',
  },
  {
    title: 'GoJobInformation',
    role: 'UI/UX Design & Development',
    problem: 'Required a comprehensive job portal platform similar to Naukri for job seekers and employers.',
    solution: 'Created a dynamic, user-friendly platform for efficient job search and recruitment.',
    tech: ['React.js', 'CSS', 'Web Development'],
    link: 'https://gojobinformation.com',
    linkLabel: 'View Live Site',
  },
  {
    title: 'Civiltech chemical company',
    role: 'UI Design & Frontend Development',
    problem: 'Needed a professional online presence to showcase chemicals and construction services.',
    solution: 'Developed a fast, responsive website with clear service offerings and product details.',
    tech: ['React.js', 'CSS', 'HTML'],
    link: 'https://www.civiltechconchem.com',
    linkLabel: 'View Live Site',
  },
  {
    title: 'EVENation',
    role: 'UI/UX Designer',
    problem: 'Required a modern interface for an event organizations platform to elevate brand perception.',
    solution: 'Created a high-fidelity Figma prototype with premium aesthetics, refined typography, and spatial balance.',
    tech: ['Figma', 'Prototyping'],
    link: 'https://field-chef-49336011.figma.site',
    linkLabel: 'View Figma Prototype',
  },
  {
    title: 'S16 Design Studio',
    role: 'UI/UX Design & Development',
    problem: 'Required a premium, creative portfolio for an interior design studio to showcase high-end visual work.',
    solution: 'Built a sleek, modern website with smooth transitions, interactive elements, and a focus on visual impact.',
    tech: ['React.js', 'Framer Motion', 'CSS'],
    link: 'https://www.s16designstudio.com',
    linkLabel: 'View Live Site',
  },
  {
    title: 'AnviAdvisors',
    role: 'UI/UX Designer',
    problem: 'Needed a trustworthy UI for India\'s First IBBI-Registered Valuation Firm for banks & corporates.',
    solution: 'Designed a clean, professional interface delivering next-gen valuation intelligence with a focus on tech-driven precision.',
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

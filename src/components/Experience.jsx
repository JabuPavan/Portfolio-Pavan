import React from 'react';
import { Building2 } from 'lucide-react';

const experiences = [
  {
    date: 'Feb 2025 – Present',
    role: 'Frontend Developer / UI Designer',
    company: 'Gannetz Technologies Pvt Ltd',
    desc: 'Designing modern website interfaces in Figma and converting them into responsive React.js applications. Focused on performance, responsiveness, and user-friendly design systems.',
  },
  {
    date: 'Jan 2024 – Oct 2024',
    role: 'Software Engineer',
    company: 'OHO India Life Tech Pvt Ltd',
    desc: 'Worked on an internal admin portal for hospital operations. Built reusable components, handled UI development, pagination, and optimized workflows for employees.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience section-padding bg-alt">
      <div className="container animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <div className="title-line"></div>
        </div>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item card glass rounded-xl">
              <div className="timeline-dot gradient-bg"></div>
              <div className="timeline-content">
                <span className="date-badge">{exp.date}</span>
                <h3 className="role-title">{exp.role}</h3>
                <h4 className="company-name text-gradient">
                  <Building2 size={16} /> {exp.company}
                </h4>
                <p className="role-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const education = [
  {
    date: '2020 – 2023',
    degree: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
    school: 'Siddhartha Engineering College',
    percentage: 'Percentage: 60.09%',
    Icon: GraduationCap,
  },
  {
    date: '2015 – 2018',
    degree: 'Diploma in Engineering',
    school: 'Noble Polytechnic College',
    percentage: 'Percentage: 74.45%',
    Icon: Award,
  },
  {
    date: '2014 – 2015',
    degree: 'Secondary School Certificate (SSC)',
    school: 'Sri Saraswathi Shishu Mandir, Peddapally',
    percentage: 'Percentage: 63%',
    Icon: BookOpen,
  },
];

const Education = () => {
  return (
    <section id="education" className="education section-padding">
      <div className="container animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <div className="title-line"></div>
        </div>
        <div className="timeline">
          {education.map((edu, i) => (
            <div key={i} className="timeline-item card glass rounded-xl">
              <div className="timeline-dot gradient-bg"></div>
              <div className="timeline-content">
                <span className="date-badge">{edu.date}</span>
                <h3 className="role-title">{edu.degree}</h3>
                <h4 className="company-name text-gradient">
                  <edu.Icon size={16} /> {edu.school}
                </h4>
                <p className="role-desc">{edu.percentage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

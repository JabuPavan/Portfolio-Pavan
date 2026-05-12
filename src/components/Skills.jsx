import React from 'react';
import { Code2, Palette, Wrench, Megaphone } from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" className="skills section-padding bg-alt">
      <div className="container animate-on-scroll">
        <div className="section-header">
          <h2 className="section-title">Expertise</h2>
          <div className="title-line"></div>
        </div>

        <div className="bento-grid">
          {/* Core Skills */}
          <div className="bento-card glass rounded-xl card-padding primary-bento">
            <h3><Code2 size={22} /> Frontend Development</h3>
            <p>Specialized in modern JavaScript frameworks with a strong foundation in core web technologies.</p>
            <div className="skill-tags">
              {['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'Tailwind CSS'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Design Skills */}
          <div className="bento-card glass rounded-xl card-padding">
            <h3><Palette size={22} /> Design</h3>
            <p>Creating pixel-perfect, accessible, and interactive design systems.</p>
            <div className="skill-tags">
              {['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bento-card glass rounded-xl card-padding">
            <h3><Wrench size={22} /> Tools & Cloud</h3>
            <div className="skill-tags mt-1">
              {['Git & GitHub', 'AWS Basics', 'Vercel'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Digital Work */}
          <div className="bento-card glass rounded-xl card-padding digital-bento gradient-border">
            <div className="bento-content">
              <h3><Megaphone size={22} /> Digital Marketing & Creative</h3>
              <p>
                Beyond code and design, I bring a <strong>growth-focused mindset</strong> to digital products.
                I utilize Adobe Creative Suite (Photoshop, Illustrator) for asset creation and digital creative design,
                ensuring the brand reaches its target audience effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

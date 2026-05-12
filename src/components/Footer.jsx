import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer section-padding">
      <div className="container footer-container">
        <p className="copyright">&copy; {new Date().getFullYear()} Pavan Jabu. All rights reserved.</p>
        <div className="footer-links">
          <a href="#hero">
            Back to top <ArrowUp size={16} />
          </a>
          <a href="/Images/Jabu Pavan.pdf" download className="footer-dl">
            Download CV
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

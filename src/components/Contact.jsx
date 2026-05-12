import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, Instagram, Send, Loader2 } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyfVrAwJQZj-jBjzouqhFygqlHxGsvurTk_tuEz1hCBmoL9V0-bUUj4wyfi-il1aN7PNA/exec';

const Contact = () => {
  const [status, setStatus] = useState({ msg: '', color: '' });
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ msg: '', color: '' });

    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: new FormData(formRef.current) });
      setStatus({ msg: "Message submitted successfully! I'll get back to you soon.", color: 'var(--success-color, #10b981)' });
      formRef.current.reset();
    } catch (err) {
      setStatus({ msg: 'Something went wrong. Please try again later.', color: 'var(--error-color, #ef4444)' });
    } finally {
      setSending(false);
      setTimeout(() => setStatus({ msg: '', color: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container animate-on-scroll">
        <div className="contact-wrapper glass rounded-2xl">
          <div className="contact-info">
            <h2>Let's build something amazing together.</h2>
            <p>Whether you have a project in mind or just want to chat, I'm always open to discussing product design work or partnership opportunities.</p>

            <div className="contact-methods">
              <a href="mailto:jabupavanpatel@gmail.com" className="contact-method-item">
                <div className="icon-box"><Mail size={22} /></div>
                <div>
                  <p className="method-label">Email</p>
                  <p className="method-val">jabupavanpatel@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919502827624" className="contact-method-item">
                <div className="icon-box"><Phone size={22} /></div>
                <div>
                  <p className="method-label">Phone</p>
                  <p className="method-val">+91 9502827624</p>
                </div>
              </a>
            </div>

            <div className="social-links mt-2">
              <a href="https://www.linkedin.com/in/jabu-pavan-a627311a2/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-btn glass"><Linkedin size={20} /></a>
              <a href="https://github.com/JabuPavan" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-btn glass"><Github size={20} /></a>
              <a href="https://www.instagram.com/pavan_______28" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn glass"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="contact-form-container">
            <form ref={formRef} name="submit-to-google-sheet" className="premium-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="form-name">Name</label>
                <input type="text" id="form-name" name="Name" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label htmlFor="form-email">Email</label>
                <input type="email" id="form-email" name="Email" placeholder="john@example.com" required />
              </div>
              <div className="input-group">
                <label htmlFor="form-msg">Message</label>
                <textarea id="form-msg" name="Message" rows={4} placeholder="How can I help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary full-width" disabled={sending}>
                {sending ? (
                  <><Loader2 size={18} className="spin" /> Sending...</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
              {status.msg && (
                <span className="form-msg-status" style={{ color: status.color }}>{status.msg}</span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

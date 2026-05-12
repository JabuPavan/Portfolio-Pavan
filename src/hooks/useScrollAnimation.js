import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

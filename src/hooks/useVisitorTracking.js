import { useEffect, useRef } from 'react';
import { UAParser } from 'ua-parser-js';

export function useVisitorTracking() {
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only run once per session
    if (trackedRef.current) return;
    if (process.env.NODE_ENV === 'development') {
      console.log('Visitor tracking bypassed in development mode.');
      return;
    }

    trackedRef.current = true;

    const trackVisitor = async () => {
      try {
        const parser = new UAParser();
        const result = parser.getResult();

        const visitorData = {
          device_type: result.device.type || 'Desktop',
          browser: result.browser.name || 'Unknown',
          os: result.os.name || 'Unknown',
          referrer: document.referrer || 'Direct',
          landing_page: window.location.href,
        };

        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    trackVisitor();
  }, []);
}

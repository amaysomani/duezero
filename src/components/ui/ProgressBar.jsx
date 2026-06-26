import React, { useEffect, useRef, useState } from 'react';
import './ProgressBar.css';

export default function ProgressBar({ value = 0, max = 100, variant = 'accent', showLabel = false, height = 4, animated = true }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth((value / max) * 100), 100);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, max]);

  return (
    <div className={`progress-wrap ${animated ? 'animated' : ''}`} ref={ref}>
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill progress-fill-${variant}`}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress-label">{Math.round(width)}%</span>
      )}
    </div>
  );
}

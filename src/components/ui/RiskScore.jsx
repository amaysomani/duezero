import React from 'react';
import './RiskScore.css';

export default function RiskScore({ score = 0, size = 'md', showLabel = true }) {
  const getColor = (s) => {
    if (s >= 75) return 'var(--danger)';
    if (s >= 50) return 'var(--warning)';
    if (s >= 25) return 'var(--accent)';
    return 'var(--success)';
  };

  const getLabel = (s) => {
    if (s >= 75) return 'High Risk';
    if (s >= 50) return 'Medium Risk';
    if (s >= 25) return 'Low Risk';
    return 'Minimal Risk';
  };

  const r = size === 'lg' ? 52 : size === 'sm' ? 28 : 40;
  const strokeWidth = size === 'lg' ? 5 : size === 'sm' ? 3 : 4;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = (r + strokeWidth) * 2 + 4;
  const color = getColor(score);

  return (
    <div className={`risk-score risk-score-${size}`}>
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
            filter: `drop-shadow(0 0 6px ${color}60)`,
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={color}
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize={size === 'lg' ? '22' : size === 'sm' ? '13' : '16'}
        >
          {score}
        </text>
      </svg>
      {showLabel && (
        <div className="risk-score-label" style={{ color }}>
          {getLabel(score)}
        </div>
      )}
    </div>
  );
}

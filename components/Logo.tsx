import React from 'react';

export default function Logo({ className = "w-8 h-8", mode = "gold" }: { className?: string; mode?: 'gold' | 'dark' }) {
  const isDark = mode === 'dark';
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Hexagon */}
      <polygon 
        points="16,2 30,10 30,26 16,30 2,26 2,10" 
        stroke={isDark ? "#050d24" : "url(#logoGoldGrad)"} 
        strokeWidth="2" 
        strokeLinejoin="round" 
        fill={isDark ? "rgba(5,13,36,0.06)" : "rgba(245,166,35,0.06)"} 
      />
      {/* Inner Roof / House */}
      <path d="M9 16L16 10L23 16V22C23 23.1 22.1 24 21 24H11C9.9 24 9 23.1 9 22V16Z" fill={isDark ? "#050d24" : "url(#logoGoldGrad)"} />
      {/* Door cutout */}
      <path d="M14 17L16 15L18 17V21H14V17Z" fill={isDark ? "#fbbf24" : "#050d24"} />
      <defs>
        <linearGradient id="logoGoldGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5A623"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

import React from 'react';

const PokeballIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
  >
    <g>
      {/* Partie haute rouge */}
      <path
        d="M256,0C132.3,0,30.3,89.6,4.6,208h155.5c26.7-31.1,66-50.7,95.9-50.7s69.2,19.6,95.9,50.7H507.4
        C481.7,89.6,379.7,0,256,0z"
        fill="#EF3B3A"
      />
      {/* Partie basse blanche */}
      <path
        d="M4.6,304C30.3,422.4,132.3,512,256,512s225.7-89.6,251.4-208H351.9
        c-26.7,31.1-66,50.7-95.9,50.7s-69.2-19.6-95.9-50.7H4.6z"
        fill="#FFFFFF"
      />
      {/* Anneau noir */}
      <circle cx="256" cy="256" r="64" fill="#2E2E2E" />
      {/* Bouton central gris clair */}
      <circle cx="256" cy="256" r="32" fill="#D9D9D9" />
    </g>
  </svg>
);

export default PokeballIcon;

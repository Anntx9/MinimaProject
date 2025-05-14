import type { SVGProps } from 'react';

export function MinimaProjectLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7l6 6-6 6" />
      <path d="M9 3l6 6-6 6" />
      <path d="M15 7l6-6-6 6" /> {/* Simplified representation of "M" or minimalist mark */}
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="none" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export function PlaceholderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

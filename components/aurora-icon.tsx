export function AuroraIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky background */}
      <circle cx="50" cy="50" r="48" fill="url(#skyGradient)" opacity="0.1" />

      {/* Aurora waves - cute wavy lights */}
      <path
        d="M 15 50 Q 25 45, 35 50 T 55 50 T 75 50 T 95 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 12 60 Q 22 55, 32 60 T 52 60 T 72 60 T 98 60"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 18 40 Q 28 35, 38 40 T 58 40 T 78 40 T 92 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Little stars */}
      <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="70" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="85" cy="35" r="1.5" fill="currentColor" opacity="0.6" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "currentColor", stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: "currentColor", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

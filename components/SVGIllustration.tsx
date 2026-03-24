export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* ── Background washes ── */}
      <ellipse cx="300" cy="350" rx="240" ry="300" fill="#F5F0E8" fillOpacity="0.04" />
      <ellipse cx="400" cy="200" rx="130" ry="160" fill="#F5F0E8" fillOpacity="0.03" />

      {/* ── Large ink blob / figure silhouette ── */}
      {/* Main body — thick brush-like outer form */}
      <path
        className="ink-draw-path"
        d="M 220 620 C 210 540 195 460 200 380 C 205 320 230 270 260 220
           C 275 196 285 175 300 155 C 315 175 325 196 340 220
           C 370 270 395 320 400 380 C 405 460 390 540 380 620"
        stroke="#F5F0E8"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
      />

      {/* Head/face silhouette — oval */}
      <path
        className="ink-draw-path ink-delay-1"
        d="M 265 155 C 255 135 252 108 260 88
           C 268 68 285 55 300 52
           C 315 55 332 68 340 88
           C 348 108 345 135 335 155
           C 325 170 312 178 300 178
           C 288 178 275 170 265 155 Z"
        stroke="#F5F0E8"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* Hair — flowing left */}
      <path
        className="ink-draw-path ink-delay-2"
        d="M 268 88 C 255 75 235 65 215 70
           C 195 75 178 90 172 110
           C 166 130 175 152 190 162
           C 205 172 222 168 235 158"
        stroke="#F5F0E8"
        strokeWidth="2.8"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* Hair — flowing right, wind-swept */}
      <path
        className="ink-draw-path ink-delay-2"
        d="M 335 88 C 348 72 368 60 390 65
           C 412 70 428 88 432 110
           C 436 130 428 152 415 164"
        stroke="#F5F0E8"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* Fine hair detail strands — left */}
      <path
        d="M 235 158 C 225 148 218 132 222 118 C 226 104 238 96 252 92"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 225 142 C 210 138 198 128 196 115"
        stroke="#F5F0E8"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Fine hair detail strands — right */}
      <path
        d="M 365 158 C 378 148 384 132 380 118 C 376 104 364 96 350 93"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Eyes — minimalist horizontal lines */}
      <line x1="283" y1="125" x2="296" y2="123" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="304" y1="123" x2="317" y2="125" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Nose — single curved line */}
      <path d="M 298 130 C 296 140 294 145 298 150 C 302 155 306 152 304 145"
        stroke="#F5F0E8" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Lips */}
      <path d="M 289 158 C 294 162 306 162 311 158" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 289 158 C 294 154 306 154 311 158" stroke="#F5F0E8" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* ── Arms ── */}
      {/* Left arm — reaching down/forward */}
      <path
        className="ink-draw-path ink-delay-3"
        d="M 230 280 C 215 300 195 330 180 370
           C 170 395 168 420 172 440"
        stroke="#F5F0E8"
        strokeWidth="2.2"
        strokeLinecap="round"
        pathLength="1"
      />
      {/* Left hand */}
      <path
        d="M 172 440 C 168 448 162 455 165 465
           C 168 472 178 470 182 462
           C 185 456 184 448 182 442"
        stroke="#F5F0E8"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Right arm — raised slightly */}
      <path
        className="ink-draw-path ink-delay-3"
        d="M 370 280 C 385 300 405 325 418 360
           C 426 383 428 408 422 430"
        stroke="#F5F0E8"
        strokeWidth="2.2"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* ── Fabric/clothing folds ── */}
      <path
        d="M 240 350 C 245 370 248 400 244 430"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M 270 380 C 268 405 265 435 268 460"
        stroke="#F5F0E8"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 330 360 C 335 385 336 415 332 445"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M 355 390 C 355 415 352 440 355 465"
        stroke="#F5F0E8"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* ── Second figure (background, faded) ── */}
      <path
        d="M 440 580 C 445 510 450 440 445 380 C 440 330 425 290 415 260
           C 405 230 400 210 395 190"
        stroke="#F5F0E8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.18"
      />
      <ellipse cx="395" cy="172" rx="22" ry="28" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.18" />
      {/* Second figure hair */}
      <path
        d="M 376 165 C 365 155 355 148 355 138 C 355 126 362 118 372 116"
        stroke="#F5F0E8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* ── Ink splatter dots ── */}
      {[
        [155, 280, 3, 0.5], [148, 295, 2, 0.4], [144, 310, 1.5, 0.3],
        [450, 310, 3.5, 0.55], [458, 325, 2, 0.4], [445, 340, 1.5, 0.3],
        [175, 480, 2.5, 0.45], [165, 496, 1.5, 0.35],
        [435, 480, 2.5, 0.5], [445, 495, 1.8, 0.35],
        [190, 150, 2, 0.4], [420, 145, 2.5, 0.4],
        [130, 380, 1.5, 0.3], [470, 400, 2, 0.35],
        [300, 640, 3, 0.4], [285, 650, 2, 0.3], [315, 648, 1.5, 0.25],
      ].map(([cx, cy, r, opacity], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="#F5F0E8"
          fillOpacity={opacity}
        />
      ))}

      {/* ── Decorative ink-drip lines ── */}
      <path
        d="M 158 290 C 157 300 156 312 158 320 C 160 328 163 322 162 314"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 448 320 C 450 332 452 346 450 356 C 448 364 445 358 446 348"
        stroke="#F5F0E8"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* ── Rotated text labels (barely visible) ── */}
      <text
        x="90" y="380"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="#F5F0E8"
        fillOpacity="0.12"
        transform="rotate(-90 90 380)"
        letterSpacing="5"
      >
        COMMUNITY
      </text>
      <text
        x="510" y="300"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="#F5F0E8"
        fillOpacity="0.10"
        transform="rotate(90 510 300)"
        letterSpacing="5"
      >
        CIRCLE
      </text>

      {/* ── Thin organic border rings (like the app screenshots) ── */}
      <ellipse cx="300" cy="340" rx="195" ry="245"
        stroke="#F5F0E8" strokeWidth="0.4" strokeOpacity="0.08" fill="none"
        strokeDasharray="3 8"
      />
      <ellipse cx="300" cy="340" rx="210" ry="262"
        stroke="#F5F0E8" strokeWidth="0.3" strokeOpacity="0.05" fill="none"
        strokeDasharray="2 12"
      />
    </svg>
  )
}

export function InkSplashDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-10 ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Organic brush-stroke horizontal line */}
      <path
        d="M 0 24 Q 80 18 180 26 Q 280 34 400 22 Q 520 10 640 24
           Q 760 38 880 22 Q 1000 8 1120 26 Q 1240 40 1360 22 Q 1400 18 1440 24"
        stroke="#3d3d3d"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Scattered ink dots */}
      {[120, 320, 580, 820, 1060, 1280].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={24 + (i % 2 === 0 ? 5 : -5)}
          r={i % 3 === 0 ? 2 : 1.2}
          fill="#3d3d3d"
          fillOpacity="0.7"
        />
      ))}
    </svg>
  )
}

export function RingIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Background glow */}
      <ellipse cx="200" cy="200" rx="160" ry="160" fill="#F5F0E8" fillOpacity="0.02" />

      {/* Ring — 3/4 perspective view */}
      {/* Outer band bottom ellipse */}
      <ellipse cx="200" cy="255" rx="105" ry="32"
        stroke="#F5F0E8" strokeWidth="1.5" strokeOpacity="0.55" fill="none" />
      {/* Outer band top ellipse */}
      <ellipse cx="200" cy="185" rx="105" ry="32"
        stroke="#F5F0E8" strokeWidth="1.8" strokeOpacity="0.85" fill="none" />

      {/* Band left side */}
      <path d="M 95 185 L 95 255"
        stroke="#F5F0E8" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" />
      {/* Band right side */}
      <path d="M 305 185 L 305 255"
        stroke="#F5F0E8" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" />

      {/* Inner hole top ellipse */}
      <ellipse cx="200" cy="185" rx="72" ry="22"
        stroke="#F5F0E8" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      {/* Inner hole bottom arc (only front half visible) */}
      <path d="M 128 255 C 128 268 162 278 200 278 C 238 278 272 268 272 255"
        stroke="#F5F0E8" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" fill="none" />

      {/* Subtle shading — left band highlight */}
      <path d="M 95 200 C 95 195 100 190 110 188"
        stroke="#F5F0E8" strokeWidth="3" strokeOpacity="0.12" strokeLinecap="round" />
      {/* Right band highlight */}
      <path d="M 305 200 C 305 195 300 190 290 188"
        stroke="#F5F0E8" strokeWidth="3" strokeOpacity="0.08" strokeLinecap="round" />

      {/* Engraving — small circle motif at front top */}
      <circle cx="200" cy="185" r="9"
        stroke="#F5F0E8" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <circle cx="200" cy="185" r="4"
        stroke="#F5F0E8" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />

      {/* Ink splatter dots */}
      {([
        [90, 160, 2, 0.4], [82, 172, 1.4, 0.3], [310, 158, 2.5, 0.45],
        [318, 173, 1.5, 0.3], [200, 310, 2, 0.35], [185, 318, 1.2, 0.25],
        [215, 315, 1.5, 0.3],
      ] as [number,number,number,number][]).map(([cx, cy, r, op], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#F5F0E8" fillOpacity={op} />
      ))}

      {/* Faint orbit rings around the ring */}
      <ellipse cx="200" cy="220" rx="148" ry="90"
        stroke="#F5F0E8" strokeWidth="0.3" strokeOpacity="0.06"
        strokeDasharray="3 10" fill="none" />
      <ellipse cx="200" cy="220" rx="168" ry="105"
        stroke="#F5F0E8" strokeWidth="0.2" strokeOpacity="0.04"
        strokeDasharray="2 14" fill="none" />

      {/* Rotated text */}
      <text x="50" y="220" fontFamily="Georgia, serif" fontSize="8"
        fill="#F5F0E8" fillOpacity="0.1" transform="rotate(-90 50 220)" letterSpacing="6">
        CIRLE
      </text>
    </svg>
  )
}

export function InkCircleDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="88"
        stroke="#F5F0E8" strokeWidth="0.6" strokeOpacity="0.15"
        strokeDasharray="4 8" fill="none" />
      <circle cx="100" cy="100" r="72"
        stroke="#F5F0E8" strokeWidth="0.4" strokeOpacity="0.10"
        strokeDasharray="2 10" fill="none" />
      <circle cx="100" cy="100" r="55"
        stroke="#F5F0E8" strokeWidth="0.3" strokeOpacity="0.07"
        fill="none" />
    </svg>
  )
}

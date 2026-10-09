// Векторная сцена: белая Honda Jazz на ножничном подъёмнике, под ней мастер в синем комбинезоне.

const SCISSOR_POINTS = [
  [295, 588],
  [545, 588],
  [420, 525],
  [295, 462],
  [545, 462],
  [420, 400],
  [295, 338],
  [545, 338],
]

const SCISSOR_ARMS = [
  [295, 588, 545, 462],
  [545, 588, 295, 462],
  [295, 462, 545, 338],
  [545, 462, 295, 338],
]

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={44} fill="#12161c" />
      <circle cx={cx} cy={cy} r={40} fill="none" stroke="#2a3038" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={30} fill="url(#rim)" />
      <circle cx={cx} cy={cy} r={23} fill="#4b525c" />
      <path d={`M ${cx + 10} ${cy - 20} a 22 22 0 0 1 12 14`} stroke="#d9262e" strokeWidth={7} strokeLinecap="round" fill="none" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={cx - 4} y={cy - 29} width={8} height={22} rx={3} fill="url(#rim)" transform={`rotate(${i * 72} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={8} fill="#e3e7ec" />
      <circle cx={cx} cy={cy} r={3} fill="#9aa3af" />
    </g>
  )
}

export function HeroIllustration({ label }: { label: string }) {
  return (
    <svg className="hero-art__svg" viewBox="96 96 624 524" role="img" aria-label={label} preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f1f4f8" />
          <stop offset="1" stopColor="#c3cad5" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4c66" />
          <stop offset="0.5" stopColor="#1b2433" />
          <stop offset="1" stopColor="#0d131c" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c7684" />
          <stop offset="1" stopColor="#2c323c" />
        </linearGradient>
        <radialGradient id="rim" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f4f6f9" />
          <stop offset="1" stopColor="#8d96a3" />
        </radialGradient>
        <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a7bff" />
          <stop offset="1" stopColor="#1a47b0" />
        </linearGradient>
        <radialGradient id="floorShadow">
          <stop offset="0" stopColor="#000" stopOpacity="0.65" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="headGlow">
          <stop offset="0" stopColor="#dff1ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7cc4ff" stopOpacity="0" />
        </radialGradient>
        <pattern id="hazard" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="16" height="16" fill="#1b1f26" />
          <rect width="8" height="16" fill="#f5c518" />
        </pattern>
      </defs>

      {/* Тень на полу */}
      <ellipse cx="410" cy="606" rx="340" ry="20" fill="url(#floorShadow)" />

      {/* Основание подъёмника */}
      <rect x="262" y="584" width="316" height="18" rx="4" fill="url(#metal)" />
      <rect x="262" y="584" width="316" height="3" rx="1.5" fill="#8a94a3" />

      {/* Ножничный механизм */}
      <g className="lift-scissor">
        {SCISSOR_ARMS.map(([x1, y1, x2, y2], i) => (
          <line key={`b${i}`} x1={x1 + 14} y1={y1 - 8} x2={x2 + 14} y2={y2 - 8} stroke="#262c35" strokeWidth={14} strokeLinecap="round" />
        ))}
        <line x1="338" y1="580" x2="394" y2="540" stroke="#c81e27" strokeWidth={15} strokeLinecap="round" />
        <line x1="394" y1="540" x2="418" y2="524" stroke="#d6dbe2" strokeWidth={6} strokeLinecap="round" />
        {SCISSOR_ARMS.map(([x1, y1, x2, y2], i) => (
          <line key={`f${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#metal)" strokeWidth={14} strokeLinecap="round" />
        ))}
        {SCISSOR_POINTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={6} fill="#cfd5dd" stroke="#2c323c" strokeWidth={2} />
        ))}
      </g>

      {/* Платформа и автомобиль поднимаются вместе */}
      <g className="lift-top">
        {/* Тёмные ниши колёсных арок */}
        <circle cx="240" cy="278" r="50" fill="#0b0e13" />
        <circle cx="555" cy="278" r="50" fill="#0b0e13" />
        {/* Днище */}
        <rect x="186" y="294" width="430" height="16" rx="6" fill="#1c222c" />

        {/* Кузов */}
        <path
          d="M146 296 C140 272 148 254 172 246 L258 220 C296 186 332 156 372 134 C430 122 548 120 604 124 C628 126 640 146 648 176 L660 252 C663 276 662 294 654 304 L600 304 A52 52 0 1 0 510 304 L285 304 A52 52 0 1 0 195 304 L160 304 C152 303 148 300 146 296 Z"
          fill="url(#carBody)"
          stroke="#8f99a8"
          strokeWidth="1.5"
        />

        {/* Остекление */}
        <path d="M272 226 C304 196 338 168 378 146 C434 136 544 134 596 137 C614 139 624 154 630 178 L634 208 Z" fill="url(#glass)" />
        <path d="M300 214 L372 152 L404 148 L322 214 Z" fill="#fff" opacity="0.13" />
        <path d="M480 210 L520 140 L536 140 L496 209 Z" fill="#fff" opacity="0.08" />
        {/* Стойки */}
        <path d="M318 224 L352 166 L364 160 L332 222 Z" fill="#eef1f5" />
        <path d="M452 218 L456 138 L470 138 L467 216 Z" fill="#141a24" />
        <path d="M566 212 L570 136 L584 137 L582 211 Z" fill="#eef1f5" />
        {/* Задний спойлер */}
        <path d="M590 124 C612 122 630 128 640 142 L630 146 C622 136 606 131 588 131 Z" fill="#141a24" />

        {/* Линии дверей и рельеф */}
        <path d="M334 224 C328 252 326 280 328 304" stroke="#a6afbc" strokeWidth="1.6" fill="none" />
        <path d="M462 216 L462 304" stroke="#a6afbc" strokeWidth="1.6" fill="none" />
        <path d="M576 212 C584 236 590 256 594 280" stroke="#a6afbc" strokeWidth="1.6" fill="none" />
        <path d="M176 254 C300 242 480 236 652 226" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.9" />
        <path d="M178 258 C300 246 480 240 653 230" stroke="#b5bdc9" strokeWidth="1.4" fill="none" />
        <path d="M200 290 C320 286 470 286 640 284" stroke="#b5bdc9" strokeWidth="1.2" fill="none" opacity="0.7" />

        {/* Ручки дверей */}
        <rect x="418" y="236" width="28" height="6" rx="3" fill="#b9c1cc" />
        <rect x="532" y="231" width="26" height="6" rx="3" fill="#b9c1cc" />

        {/* Зеркало */}
        <path d="M314 228 C310 216 318 210 334 210 L340 224 Z" fill="#f4f6f9" stroke="#8f99a8" strokeWidth="1.2" />

        {/* Фара и свечение */}
        <ellipse cx="150" cy="258" rx="60" ry="26" fill="url(#headGlow)" className="headlight-glow" />
        <path d="M152 262 C160 252 176 247 196 244 L238 232 C234 244 222 252 206 256 C186 261 168 264 152 266 Z" fill="#e6f0fb" stroke="#7d8796" strokeWidth="1.2" />
        <path d="M168 258 C190 252 212 247 230 238" stroke="#7cc4ff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {/* Решётка и воздухозаборник */}
        <path d="M150 280 L196 277 L198 290 L152 293 Z" fill="#1c222c" />
        <path d="M156 285 L192 283" stroke="#3a424e" strokeWidth="1.5" />

        {/* Задний фонарь */}
        <path d="M644 168 C650 190 655 214 657 242 L649 242 C647 214 643 190 638 170 Z" fill="#d4202b" />
        <path d="M646 182 L651 230" stroke="#ff8a8f" strokeWidth="1.5" opacity="0.8" />
        <rect x="640" y="288" width="18" height="5" rx="2" fill="#a0141c" />

        <Wheel cx={240} cy={278} />
        <Wheel cx={555} cy={278} />

        {/* Платформа подъёмника */}
        <rect x="150" y="322" width="520" height="16" rx="3" fill="url(#metal)" />
        <rect x="150" y="322" width="520" height="3" rx="1.5" fill="#9aa4b2" />
        <rect x="150" y="332" width="520" height="6" fill="url(#hazard)" />
        <path d="M150 322 L126 338 L150 338 Z" fill="#3a414c" />
        <path d="M670 322 L694 338 L670 338 Z" fill="#3a414c" />
      </g>

      {/* Мастер в синем комбинезоне */}
      <g className="mechanic">
        <ellipse cx="212" cy="606" rx="48" ry="6" fill="#000" opacity="0.45" />
        <path d="M190 492 L186 596 L204 596 L210 500 Z" fill="#1846a8" />
        <path d="M206 492 L222 596 L240 596 L230 490 Z" fill="#2358cc" />
        <rect x="187" y="560" width="17" height="5" fill="#cfd8e6" opacity="0.75" />
        <rect x="219" y="560" width="18" height="5" fill="#cfd8e6" opacity="0.75" />
        <rect x="178" y="592" width="30" height="12" rx="5" fill="#0f1217" />
        <rect x="218" y="592" width="34" height="12" rx="5" fill="#0f1217" />

        <path d="M184 428 C176 452 172 470 172 490" stroke="#1a4bb8" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M180 424 C190 410 222 408 234 420 L238 500 C222 506 196 506 182 500 Z" fill="url(#suit)" />
        <rect x="183" y="470" width="54" height="5" fill="#cfd8e6" opacity="0.75" />
        <rect x="214" y="430" width="14" height="12" rx="2" fill="#1a47b0" stroke="#5d8fff" strokeWidth="1" />
        <circle cx="172" cy="496" r="7" fill="#e8b08a" />
        <path d="M172 502 L168 538" stroke="#c3cad4" strokeWidth="5" strokeLinecap="round" />
        <path d="M162 538 a7 7 0 1 0 12 0" stroke="#c3cad4" strokeWidth="4" fill="none" />

        <rect x="201" y="398" width="14" height="16" rx="4" fill="#d49a74" />
        <circle cx="208" cy="386" r="17" fill="#e8b08a" />
        <circle cx="200" cy="389" r="3.4" fill="#d49a74" />
        <path d="M190 384 C189 366 226 362 227 382 Z" fill="#1a3f9c" />
        <path d="M222 378 L243 373 L242 380 L224 384 Z" fill="#14317a" />

        <path d="M228 426 C240 410 248 396 250 380 L254 356" stroke="#2358cc" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="254" cy="352" r="7" fill="#e8b08a" />
        <path d="M254 352 L262 340" stroke="#c3cad4" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

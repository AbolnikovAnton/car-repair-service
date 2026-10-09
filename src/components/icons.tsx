import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const OilIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s-6 6.8-6 11a6 6 0 0 0 12 0c0-4.2-6-11-6-11z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
)

export const CvtIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="7" cy="12" r="4" />
    <circle cx="17.5" cy="12" r="2.5" />
    <path d="M7 8l10.5 1.5M7 16l10.5-1.5" />
    <circle cx="7" cy="12" r="1" />
  </svg>
)

export const GearIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    <circle cx="12" cy="12" r="6.5" />
  </svg>
)

export const ShifterIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 5v14M12 5v14M19 5v7M5 12h14" />
    <circle cx="5" cy="5" r="1.5" />
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
)

export const FuelFilterIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M7 7h4" />
    <path d="M14 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3" />
  </svg>
)

export const PlugIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2v3M9 5h6v4H9zM10 9h4v6h-4zM12 15v2.5M10 20h4M12 17.5V20" />
    <path d="M17 13l2-2-1.5-.5L19 8" />
  </svg>
)

export const BeltIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="7" cy="7.5" r="3.5" />
    <circle cx="16.5" cy="16" r="4.5" />
    <path d="M4.2 9.5l9.1 9.9M9.5 5l10.4 7.8" />
  </svg>
)

export const BrakeDiscIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M15.5 3.2a9.5 9.5 0 0 1 5.3 7.3" strokeWidth={3.4} />
  </svg>
)

export const CoolingIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3a2 2 0 0 0-2 2v9.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
    <path d="M12 9v7" />
    <path d="M17 6c1 .6 2 .6 3 0M17 10c1 .6 2 .6 3 0" />
  </svg>
)

export const BrakeWarningIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="6" />
    <path d="M4.5 6.5a9.5 9.5 0 0 0 0 11M19.5 6.5a9.5 9.5 0 0 1 0 11M12 8.8v3.6M12 15.2v.1" />
  </svg>
)

export const FuelCanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
    <path d="M8 4v4h6M9 13l6 5M15 13l-6 5" />
  </svg>
)

export const SpringIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2v3M12 19v3M7 5h10L7 8.5 17 12 7 15.5 17 19H7" />
  </svg>
)

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
    <path d="M9 8.2c.3-.6.9-.6 1.2 0l.7 1.6c.1.3 0 .6-.2.8l-.5.5a6 6 0 0 0 2.7 2.7l.5-.5c.2-.2.5-.3.8-.2l1.6.7c.6.3.6.9 0 1.2-.8.6-1.8.8-2.7.4A8.4 8.4 0 0 1 8.6 11c-.4-.9-.2-1.9.4-2.8z" fill="currentColor" stroke="none" />
  </svg>
)

export const StarIcon = (p: IconProps) => (
  <svg {...base({ ...p })} fill="currentColor" stroke="none">
    <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
  </svg>
)

export const ChevronIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const ArrowDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
)

export const QuoteIcon =(p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5v3c-1.8.4-2.8 1.6-2.8 3.5H10v6H4zm10 0v-5.5c0-4.1 2.2-6.5 6-7v3c-1.8.4-2.8 1.6-2.8 3.5H20v6h-6z" />
  </svg>
)

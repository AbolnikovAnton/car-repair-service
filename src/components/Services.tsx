import type { ComponentType, CSSProperties, SVGProps } from 'react'
import { useLang } from '../i18n/context'
import {
  BeltIcon,
  BrakeDiscIcon,
  BrakeWarningIcon,
  CoolingIcon,
  CvtIcon,
  FuelCanIcon,
  FuelFilterIcon,
  GearIcon,
  OilIcon,
  PlugIcon,
  ShifterIcon,
  SpringIcon,
} from './icons'

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  oil: OilIcon,
  cvt: CvtIcon,
  at: GearIcon,
  mt: ShifterIcon,
  fuelFilter: FuelFilterIcon,
  plugs: PlugIcon,
  belts: BeltIcon,
  brakes: BrakeDiscIcon,
  cooling: CoolingIcon,
  brakeSystem: BrakeWarningIcon,
  fuelSystem: FuelCanIcon,
  suspension: SpringIcon,
}

export function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="section services">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="kicker">{t.services.kicker}</span>
          <h2 className="section__title">{t.services.title}</h2>
          <p className="section__subtitle">{t.services.subtitle}</p>
        </header>

        <ul className="services__grid">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[item.id]
            return (
              <li key={item.id} className="service-card" data-reveal style={{ '--d': i % 4 } as CSSProperties}>
                <span className="service-card__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-card__icon">
                  <Icon width={28} height={28} />
                </span>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__text">{item.text}</p>
              </li>
            )
          })}
        </ul>

        <div className="section__cta" data-reveal>
          <a href="#contacts" className="btn btn--primary btn--lg">
            {t.services.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

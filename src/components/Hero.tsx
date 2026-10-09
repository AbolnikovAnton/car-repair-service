import { useEffect, useRef, type CSSProperties } from 'react'
import { useLang } from '../i18n/context'
import { HeroIllustration } from './HeroIllustration'
import { ArrowDownIcon } from './icons'

export function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  // Прогресс прокрутки первого экрана (0…1) → CSS-переменная --p для плавного ухода героя под карточки
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
      el.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__lamp hero__lamp--1" />
        <span className="hero__lamp hero__lamp--2" />
        <span className="hero__lamp hero__lamp--3" />
        <span className="hero__floor" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="badge hero__anim" style={{ '--d': 0 } as CSSProperties}>
            <span className="badge__dot" />
            {t.hero.badge}
          </span>
          <h1 className="hero__title hero__anim" style={{ '--d': 1 } as CSSProperties}>
            <span className="text-gradient">{t.hero.titleA}</span> {t.hero.titleB}{' '}
            <span className="hero__title-muted">{t.hero.titleC}</span>
          </h1>
          <p className="hero__slogan hero__anim" style={{ '--d': 2 } as CSSProperties}>
            <span className="hero__slogan-line" />
            {t.hero.slogan}
          </p>
          <div className="hero__actions hero__anim" style={{ '--d': 3 } as CSSProperties}>
            <a href="#contacts" className="btn btn--primary btn--lg">
              {t.hero.cta}
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <ul className="hero__stats hero__anim" style={{ '--d': 4 } as CSSProperties}>
            {t.hero.stats.map((s) => (
              <li key={s.label}>
                <strong dir="ltr">{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__art">
          <HeroIllustration label={t.hero.artAlt} />
        </div>
      </div>

      <a href="#services" className="hero__scroll" aria-label={t.hero.scroll}>
        <span>{t.hero.scroll}</span>
        <ArrowDownIcon width={18} height={18} />
      </a>
    </section>
  )
}

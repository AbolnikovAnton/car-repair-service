import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { useLang } from '../i18n/context'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { CONTACTS } from '../config'
import { scrollToTop } from '../utils/scroll'
import { LangMenu } from './LangMenu'
import { MoonIcon, PhoneIcon, SunIcon } from './icons'

const SECTION_IDS = ['top', 'services', 'reviews', 'contacts']

export function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { theme, toggle: toggleTheme } = useTheme()
  const themeLabel = theme === 'dark' ? t.theme.toLight : t.theme.toDark

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Ссылки на секции; для «Главной» — прокрутка в самое начало
  const onNav = (id: string) => (e: MouseEvent) => {
    setOpen(false)
    if (id === 'top') scrollToTop(e)
  }

  const links = [
    { id: 'top', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'contacts', label: t.nav.contacts },
  ]

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="logo" onClick={onNav('top')}>
          <span className="logo__mark">P</span>
          <span className="logo__text">
            <strong>{t.brand.name}</strong>
            <small>{t.brand.sub}</small>
          </span>
        </a>

        <nav className="nav" aria-label={t.nav.menu}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`nav__link${active === l.id ? ' is-active' : ''}`} onClick={onNav(l.id)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="theme-switch" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {theme === 'dark' ? <SunIcon key="sun" width={20} height={20} /> : <MoonIcon key="moon" width={20} height={20} />}
          </button>
          <LangMenu />
          <a href={CONTACTS.phoneHref} className="btn btn--primary btn--sm header__phone">
            <PhoneIcon width={18} height={18} />
            <span dir="ltr">{CONTACTS.phoneDisplay}</span>
          </a>
          <button
            type="button"
            className="burger"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <nav className="mobile-menu__nav">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`mobile-menu__link${active === l.id ? ' is-active' : ''}`}
              style={{ '--i': i } as CSSProperties}
              tabIndex={open ? 0 : -1}
              onClick={onNav(l.id)}
            >
              <span className="mobile-menu__num">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={CONTACTS.phoneHref} className="btn btn--primary mobile-menu__cta" tabIndex={open ? 0 : -1}>
          <PhoneIcon width={20} height={20} />
          <span dir="ltr">{CONTACTS.phoneDisplay}</span>
        </a>
      </div>
    </header>
  )
}

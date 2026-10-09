import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../i18n/context'
import { LANGUAGES, type Lang } from '../i18n/dict'
import { CheckIcon, ChevronIcon, GlobeIcon } from './icons'

export function LangMenu() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  // Закрытие по клику снаружи и по Esc
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    // Фокус на выбранный язык при открытии
    root.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (code: Lang) => {
    setLang(code)
    setOpen(false)
    button.current?.focus()
  }

  // Стрелки вверх/вниз по пунктам меню
  const onMenuKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]'))
    const i = items.indexOf(document.activeElement as HTMLElement)
    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    items[next]?.focus()
  }

  return (
    <div className={`lang-menu${open ? ' is-open' : ''}`} ref={root}>
      <button
        ref={button}
        type="button"
        className="lang-menu__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.lang.label}: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon width={18} height={18} className="lang-menu__globe" />
        <span>{current.short}</span>
        <ChevronIcon width={14} height={14} className="lang-menu__chevron" />
      </button>

      <ul id={listId} className="lang-menu__list" role="menu" aria-label={t.lang.label} onKeyDown={onMenuKey}>
        {LANGUAGES.map((l) => (
          <li key={l.code} role="none">
            <button
              type="button"
              role="menuitemradio"
              aria-checked={l.code === lang}
              tabIndex={open ? 0 : -1}
              lang={l.code}
              className="lang-menu__item"
              onClick={() => choose(l.code)}
            >
              <span className="lang-menu__code">{l.short}</span>
              <span className="lang-menu__name">{l.name}</span>
              {l.code === lang && <CheckIcon width={16} height={16} className="lang-menu__check" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

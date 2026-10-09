import { useRef, type CSSProperties } from 'react'
import { useLang } from '../i18n/context'
import { ChevronIcon, QuoteIcon, StarIcon } from './icons'

export function Reviews() {
  const { t, dir } = useLang()
  const track = useRef<HTMLUListElement>(null)

  const scroll = (step: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.review-card')
    const w = card ? card.offsetWidth + 24 : el.clientWidth
    // В RTL «вперёд» — это влево
    el.scrollBy({ left: step * w * (dir === 'rtl' ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <div className="reviews__head">
          <header className="section__head section__head--start" data-reveal>
            <span className="kicker">{t.reviews.kicker}</span>
            <h2 className="section__title">{t.reviews.title}</h2>
            <p className="section__subtitle">{t.reviews.subtitle}</p>
          </header>
          <div className="reviews__side" data-reveal>
            <div className="rating">
              <strong>4.9</strong>
              <span className="rating__stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} width={18} height={18} />
                ))}
              </span>
              <small>{t.reviews.rating}</small>
            </div>
            <div className="reviews__arrows">
              <button type="button" className="icon-btn" onClick={() => scroll(-1)} aria-label={t.reviews.prev}>
                <ChevronIcon className="flip-x" />
              </button>
              <button type="button" className="icon-btn" onClick={() => scroll(1)} aria-label={t.reviews.next}>
                <ChevronIcon />
              </button>
            </div>
          </div>
        </div>

        <ul className="reviews__track" ref={track}>
          {t.reviews.items.map((r, i) => (
            <li key={r.name} className="review-card" data-reveal style={{ '--d': i % 3 } as CSSProperties}>
              <QuoteIcon className="review-card__quote" width={34} height={34} />
              <div className="review-card__stars">
                {Array.from({ length: 5 }, (_, k) => (
                  <StarIcon key={k} width={16} height={16} />
                ))}
              </div>
              <p className="review-card__text">{r.text}</p>
              <footer className="review-card__author">
                <span className="avatar">{r.name.charAt(0)}</span>
                <span>
                  <strong>{r.name}</strong>
                  <small dir="ltr">{r.car}</small>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

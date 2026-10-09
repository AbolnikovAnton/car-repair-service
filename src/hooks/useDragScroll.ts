import { useEffect, type RefObject } from 'react'

const DRAG_THRESHOLD = 5

/** Шаг прокрутки ленты: ширина карточки + gap из CSS. */
export function scrollStep(el: HTMLElement, itemSelector: string) {
  const item = el.querySelector<HTMLElement>(itemSelector)
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  return item ? item.offsetWidth + gap : el.clientWidth
}

/**
 * Перетаскивание горизонтальной ленты мышью. Тач не трогаем — у него нативный свайп.
 * После отпускания лента доводится до ближайшей карточки в сторону движения.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>, itemSelector: string) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let pointerId: number | null = null
    let startX = 0
    let startScroll = 0
    let dragging = false

    let settleTimer = 0
    // Snap возвращаем только когда доводка закончилась, иначе браузер дёрнет ленту
    const settle = () => {
      window.clearTimeout(settleTimer)
      el.removeEventListener('scrollend', settle)
      el.classList.remove('is-dragging')
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      settle()
      pointerId = e.pointerId
      startX = e.clientX
      startScroll = el.scrollLeft
      dragging = false
      e.preventDefault() // не выделять текст
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      const dx = e.clientX - startX
      if (!dragging && Math.abs(dx) > DRAG_THRESHOLD) {
        dragging = true
        el.classList.add('is-dragging')
        el.setPointerCapture(e.pointerId)
      }
      if (dragging) el.scrollLeft = startScroll - dx
    }

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = null
      if (!dragging) return
      dragging = false

      // В RTL scrollLeft отрицательный — считаем позицию в «прямых» координатах
      const sign = getComputedStyle(el).direction === 'rtl' ? -1 : 1
      const s = scrollStep(el, itemSelector)
      const pos = (el.scrollLeft * sign) / s
      const forward = (e.clientX - startX) * sign < 0
      const index = forward ? Math.ceil(pos) : Math.floor(pos)

      el.scrollTo({ left: index * s * sign, behavior: 'smooth' })
      el.addEventListener('scrollend', settle)
      settleTimer = window.setTimeout(settle, 700)
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      settle()
    }
  }, [ref, itemSelector])
}

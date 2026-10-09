/**
 * Прокрутка в самое начало страницы.
 * Якорь #top здесь не работает: главный экран закреплён (position: sticky),
 * и браузер считает, что он уже виден, поэтому никуда не прокручивает.
 * Плавность берётся из CSS (scroll-behavior), с учётом prefers-reduced-motion.
 */
export function scrollToTop(e?: { preventDefault(): void }) {
  e?.preventDefault()
  window.scrollTo({ top: 0 })
  if (location.hash) history.replaceState(null, '', location.pathname + location.search)
}

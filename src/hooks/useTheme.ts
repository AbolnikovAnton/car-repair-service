import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#070a10', light: '#f5f7fa' }

// Начальное значение уже выставлено скриптом в index.html
const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const toggle = useCallback(() => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    window.setTimeout(() => root.classList.remove('theme-anim'), 450)
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage недоступен */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}

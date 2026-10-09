import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dicts, type Lang } from './dict'
import { LangContext, type LangContextValue } from './context'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'he') return saved
  } catch {
    /* storage недоступен */
  }
  return navigator.language?.startsWith('he') ? 'he' : 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const dir = lang === 'he' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = dicts[lang].meta.title
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage недоступен */
    }
  }, [lang, dir])

  const toggle = useCallback(() => setLang((l) => (l === 'ru' ? 'he' : 'ru')), [])
  const value = useMemo<LangContextValue>(() => ({ lang, t: dicts[lang], dir, toggle }), [lang, dir, toggle])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

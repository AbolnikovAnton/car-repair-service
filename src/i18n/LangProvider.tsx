import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LANG, LANGUAGES, dicts, type Lang } from './dict'
import { LangContext, type LangContextValue } from './context'

const STORAGE_KEY = 'lang'

const isLang = (v: unknown): v is Lang => LANGUAGES.some((l) => l.code === v)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* storage недоступен */
  }
  return DEFAULT_LANG
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = dicts[lang].meta.title
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage недоступен */
    }
  }, [])

  const value = useMemo<LangContextValue>(() => ({ lang, t: dicts[lang], dir, setLang }), [lang, dir, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

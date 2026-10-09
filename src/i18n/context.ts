import { createContext, useContext } from 'react'
import type { Dict, Lang } from './dict'

export type LangContextValue = {
  lang: Lang
  t: Dict
  dir: 'ltr' | 'rtl'
  toggle: () => void
}

export const LangContext = createContext<LangContextValue | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

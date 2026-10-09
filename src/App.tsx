import { LangProvider } from './i18n/LangProvider'
import { useLang } from './i18n/context'
import { useReveal } from './hooks/useReveal'
import { waLink } from './config'
import { scrollToTop } from './utils/scroll'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Reviews } from './components/Reviews'
import { Contacts } from './components/Contacts'
import { WhatsAppIcon } from './components/icons'

function Page() {
  const { t, lang } = useLang()
  useReveal([lang])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="sheet">
          <Services />
          <Reviews />
          <Contacts />
          <footer className="footer">
            <div className="container footer__inner">
              <a href="#top" className="logo logo--sm" onClick={scrollToTop}>
                <span className="logo__mark">P</span>
                <span className="logo__text">
                  <strong>{t.brand.name}</strong>
                  <small>{t.brand.sub}</small>
                </span>
              </a>
              <p>
                © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
              </p>
              <button type="button" className="footer__top" onClick={() => scrollToTop()}>
                {t.footer.top} ↑
              </button>
            </div>
          </footer>
        </div>
      </main>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">
        <WhatsAppIcon width={28} height={28} />
      </a>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}

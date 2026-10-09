import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n/context'
import { CONTACTS, waLink } from '../config'
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons'

type Fields = { name: string; phone: string; car: string; service: string; message: string }
const EMPTY: Fields = { name: '', phone: '', car: '', service: '', message: '' }

export function Contacts() {
  const { t } = useLang()
  const f = t.contacts.form
  const [values, setValues] = useState<Fields>(EMPTY)
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setSent(false)
  }

  const errors = {
    name: !values.name.trim(),
    phone: values.phone.replace(/\D/g, '').length < 7,
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (errors.name || errors.phone) return

    const tpl = f.template
    const lines = [
      tpl.hello,
      `${tpl.name}: ${values.name.trim()}`,
      `${tpl.phone}: ${values.phone.trim()}`,
      values.car.trim() && `${tpl.car}: ${values.car.trim()}`,
      values.service && `${tpl.service}: ${values.service}`,
      values.message.trim() && `${tpl.message}: ${values.message.trim()}`,
    ].filter(Boolean)

    window.open(waLink(lines.join('\n')), '_blank', 'noopener')
    setSent(true)
  }

  const showErr = (k: keyof typeof errors) => touched && errors[k]

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="kicker">{t.contacts.kicker}</span>
          <h2 className="section__title">{t.contacts.title}</h2>
          <p className="section__subtitle">{t.contacts.subtitle}</p>
        </header>

        <div className="contacts__grid">
          <div className="contacts__info" data-reveal>
            <a href={CONTACTS.phoneHref} className="info-card">
              <span className="info-card__icon">
                <PhoneIcon />
              </span>
              <span>
                <small>{t.contacts.phone}</small>
                <strong dir="ltr">{CONTACTS.phoneDisplay}</strong>
              </span>
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="info-card info-card--wa">
              <span className="info-card__icon">
                <WhatsAppIcon />
              </span>
              <span>
                <small>{t.contacts.whatsapp}</small>
                <strong>{t.contacts.whatsappAction}</strong>
              </span>
            </a>
            <div className="info-card">
              <span className="info-card__icon">
                <PinIcon />
              </span>
              <span>
                <small>{t.contacts.address}</small>
                <strong>{t.contacts.addressValue}</strong>
              </span>
            </div>
            <div className="info-card">
              <span className="info-card__icon">
                <ClockIcon />
              </span>
              <span>
                <small>{t.contacts.hours}</small>
                <strong>
                  {t.contacts.hoursValue.split(' · ').map((line) => (
                    <span key={line} className="nowrap-line">
                      {line}
                    </span>
                  ))}
                </strong>
              </span>
            </div>
            <div className="map">
              <iframe title={t.contacts.mapTitle} src={CONTACTS.mapEmbed} loading="lazy" />
            </div>
          </div>

          <form className="form" onSubmit={onSubmit} noValidate data-reveal>
            <h3 className="form__title">{f.title}</h3>

            <div className="form__row">
              <label className={`field${showErr('name') ? ' field--error' : ''}`}>
                <span className="field__label">{f.name} *</span>
                <input value={values.name} onChange={set('name')} autoComplete="name" />
                {showErr('name') && <span className="field__error">{f.required}</span>}
              </label>
              <label className={`field${showErr('phone') ? ' field--error' : ''}`}>
                <span className="field__label">{f.phone} *</span>
                <input type="tel" dir="ltr" value={values.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" />
                {showErr('phone') && <span className="field__error">{f.required}</span>}
              </label>
            </div>

            <div className="form__row">
              <label className="field">
                <span className="field__label">{f.car}</span>
                <input value={values.car} onChange={set('car')} placeholder={f.carPlaceholder} />
              </label>
              <label className="field">
                <span className="field__label">{f.service}</span>
                <select value={values.service} onChange={set('service')}>
                  <option value="">{f.servicePlaceholder}</option>
                  {t.services.items.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value={f.serviceOther}>{f.serviceOther}</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span className="field__label">{f.message}</span>
              <textarea rows={4} value={values.message} onChange={set('message')} />
            </label>

            <button type="submit" className="btn btn--wa btn--lg btn--block">
              <WhatsAppIcon width={22} height={22} />
              {f.submit}
            </button>
            <p className="form__note" aria-live="polite">
              {sent ? f.sent : f.note}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

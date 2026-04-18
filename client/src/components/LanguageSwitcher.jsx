import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS } from '../i18n'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation()
  const active = String(i18n.language || 'sv').split('-')[0]

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 ${className}`}
      role="group"
      aria-label={t('nav.language')}
    >
      {SUPPORTED_LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={[
            'rounded-md px-2 py-1 text-xs font-semibold transition',
            active === code
              ? 'bg-white text-teal-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900',
          ].join(' ')}
          onClick={() => i18n.changeLanguage(code)}
          lang={code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

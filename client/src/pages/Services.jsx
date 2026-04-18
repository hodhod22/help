import { useTranslation } from 'react-i18next'
import {
  HiArrowPath,
  HiBuildingOffice2,
  HiDocumentText,
  HiHome,
  HiLink,
  HiUserGroup,
  HiWallet,
} from 'react-icons/hi2'

const SERVICE_ICONS = {
  social: HiHome,
  insurance: HiWallet,
  children: HiUserGroup,
  disability: HiBuildingOffice2,
  personalAssist: HiLink,
  appeals: HiDocumentText,
  coordination: HiArrowPath,
}

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900">
          {t('services.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{t('services.intro')}</p>
      </header>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2">
        {Array.isArray(items) &&
          items.map((item) => {
            const Icon = SERVICE_ICONS[item.id] ?? HiHome
            return (
              <li
                key={item.id}
                className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/25 transition group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

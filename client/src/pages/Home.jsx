import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  HiArrowRight,
  HiClipboardDocumentCheck,
  HiHeart,
  HiHome,
} from 'react-icons/hi2'

const HIGHLIGHT_ICONS = {
  homeLife: HiHome,
  support: HiHeart,
  clarity: HiClipboardDocumentCheck,
}

export default function Home() {
  const { t } = useTranslation()
  const highlights = t('home.highlights', { returnObjects: true })

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgb(45 212 191 / 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgb(99 102 241 / 0.2), transparent 40%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-300/90">
            {t('home.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{t('home.heroLead')}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-semibold text-teal-950 shadow-lg shadow-teal-900/30 transition hover:bg-teal-300"
            >
              {t('home.ctaPrimary')}
              <HiArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
            </Link>
            <Link
              to="/tjanster"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              {t('home.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t('home.whyTitle')}
          </h2>
          <p className="mt-4 text-slate-600">{t('home.whyLead')}</p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(highlights) &&
            highlights.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.id] ?? HiHome
              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600/10 text-teal-700">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </li>
              )
            })}
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/80">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {t('home.bannerTitle')}
            </h2>
            <p className="mt-2 text-slate-600">{t('home.bannerLead')}</p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {t('home.bannerCta')}
            <HiArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}

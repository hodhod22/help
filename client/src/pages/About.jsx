import { useTranslation } from 'react-i18next'
import { HiCheckBadge } from 'react-icons/hi2'

export default function About() {
  const { t } = useTranslation()
  const principles = t('about.principles', { returnObjects: true })

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-slate-600">{t('about.p1')}</p>
          <p className="mt-4 text-slate-600">{t('about.p2')}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            {t('about.howTitle')}
          </p>
          <ul className="mt-6 space-y-4">
            {Array.isArray(principles) &&
              principles.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <HiCheckBadge
                    className="h-6 w-6 shrink-0 text-teal-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {t('about.statExperience')}
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-slate-900">
                {t('about.statExperienceValue')}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {t('about.statProjects')}
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-slate-900">
                {t('about.statProjectsValue')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

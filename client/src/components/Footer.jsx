import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HiEnvelope, HiMapPin } from 'react-icons/hi2'
import { FaLinkedin } from 'react-icons/fa6'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900">
            {t('brand.prefix')}
            <span className="text-teal-600">{t('brand.suffix')}</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-slate-600">{t('footer.tagline')}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t('footer.quickLinks')}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/tjanster" className="hover:text-teal-700">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link to="/om-oss" className="hover:text-teal-700">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-teal-700">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t('footer.contactHeading')}</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <HiEnvelope className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
              <a href="mailto:" className="hover:text-teal-700">
                abdullah@swedenmail.com
                
              </a>
            </li>
            <li className="flex items-start gap-2">
              <HiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
              <span>{t('footer.location')}</span>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ali-ezadkhaha-966349404/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-teal-700 hover:text-teal-800"
              >
                <FaLinkedin className="h-5 w-5" aria-hidden />
                {t('footer.linkedin')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          {t('footer.disclaimer')}
        </p>
        <p className="mt-4 text-center text-xs text-slate-500">
          © {year} {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

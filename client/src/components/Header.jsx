import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import { closeMobileNav, toggleMobileNav } from '../features/ui/uiSlice'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const mobileOpen = useSelector((s) => s.ui.mobileNavOpen)

  const linkClass = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-teal-600/10 text-teal-800'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-slate-900"
          onClick={() => dispatch(closeMobileNav())}
        >
          {t('brand.prefix')}
          <span className="text-teal-600">{t('brand.suffix')}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t('nav.mainLabel')}
        >
          <NavLink to="/" end className={linkClass}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/tjanster" className={linkClass}>
            {t('nav.services')}
          </NavLink>
          <NavLink to="/om-oss" className={linkClass}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/kontakt" className={linkClass}>
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="flex scale-90 sm:scale-100" />
          <Link
            to="/kontakt"
            className="hidden rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 md:inline-flex"
          >
            {t('header.bookCall')}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => dispatch(toggleMobileNav())}
          >
            {mobileOpen ? (
              <HiOutlineXMark className="h-6 w-6" aria-hidden />
            ) : (
              <HiOutlineBars3 className="h-6 w-6" aria-hidden />
            )}
            <span className="sr-only">{t('header.menu')}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-slate-100 bg-white px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label={t('nav.mobileLabel')}>
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => dispatch(closeMobileNav())}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/tjanster"
              className={linkClass}
              onClick={() => dispatch(closeMobileNav())}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/om-oss"
              className={linkClass}
              onClick={() => dispatch(closeMobileNav())}
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/kontakt"
              className={linkClass}
              onClick={() => dispatch(closeMobileNav())}
            >
              {t('nav.contact')}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

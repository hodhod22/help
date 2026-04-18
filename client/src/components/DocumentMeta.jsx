import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export default function DocumentMeta() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const titles = {
      '/': t('meta.title'),
      '/tjanster': `${t('services.title')} — ${t('meta.title')}`,
      '/om-oss': `${t('about.title')} — ${t('meta.title')}`,
      '/kontakt': `${t('contact.title')} — ${t('meta.title')}`,
    }
    document.title = titles[pathname] ?? t('meta.title')

    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t('meta.description'))
  }, [pathname, i18n.language, t])

  return null
}

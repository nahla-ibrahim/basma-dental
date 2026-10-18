import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const nextLanguage = i18n.language === 'ar' ? 'en' : 'ar'
  const label = t('header.switchLanguageLabel')

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(nextLanguage)}
      aria-label={label}
      title={label}
      className="flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
    >
      <Globe className="size-4" aria-hidden="true" />
      <span aria-hidden="true">{nextLanguage.toUpperCase()}</span>
    </button>
  )
}

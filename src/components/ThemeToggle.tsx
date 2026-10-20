import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTheme, saveTheme } from '../lib/theme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState(getTheme)
  const isDark = theme === 'dark'
  const label = isDark ? t('header.lightMode') : t('header.darkMode')

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    saveTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center rounded-full text-ink-muted ring-1 ring-line transition-colors hover:bg-accent-soft hover:text-accent hover:ring-accent-line"
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}

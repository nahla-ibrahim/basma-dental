import { ChevronDown } from 'lucide-react'
import { useId, type ComponentProps } from 'react'

type SelectProps = ComponentProps<'select'> & {
  label: string
}

export function Select({ label, children, ...props }: SelectProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full appearance-none rounded-xl border border-line bg-surface py-3 ps-4 pe-10 text-ink shadow-sm transition focus:border-brand-500 focus:ring-4 focus:ring-accent-soft focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-faint"
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

import { ChevronDown } from 'lucide-react'
import { useId, type ComponentProps } from 'react'

type SelectProps = ComponentProps<'select'> & {
  label: string
}

export function Select({ label, children, ...props }: SelectProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 ps-4 pe-10 text-slate-900 shadow-sm transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

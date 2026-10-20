import { useId, type ComponentProps, type ReactNode } from 'react'

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:ring-red-100'

type FieldProps = {
  label: string
  hint?: string
  error?: string
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {hint && <span className="font-normal text-slate-400"> ({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({ label, hint, error, ...props }: FieldProps & ComponentProps<'input'>) {
  const id = useId()

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClassName}
        {...props}
      />
    </Field>
  )
}

export function TextArea({
  label,
  hint,
  error,
  ...props
}: FieldProps & ComponentProps<'textarea'>) {
  const id = useId()

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClassName} resize-none`}
        {...props}
      />
    </Field>
  )
}

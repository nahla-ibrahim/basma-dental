import { useId, type ComponentProps, type ReactNode } from 'react'

const fieldClassName =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink shadow-sm transition placeholder:text-ink-faint focus:border-brand-500 focus:ring-4 focus:ring-accent-soft focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:ring-danger-soft'

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
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-muted">
        {label}
        {hint && <span className="font-normal text-ink-faint"> ({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
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
  rows = 3,
  ...props
}: FieldProps & ComponentProps<'textarea'>) {
  const id = useId()

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClassName} resize-none`}
        {...props}
      />
    </Field>
  )
}

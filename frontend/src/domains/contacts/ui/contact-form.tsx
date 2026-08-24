import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { Button } from '@shared/ui/button'
import { useSubmitContact } from '../api/use-submit-contact'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const { t } = useTranslation('contacts')
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submit, { loading, data }] = useSubmitContact()
  const [failed, setFailed] = useState(false)

  const succeeded = Boolean(data?.submitContact)

  function validate(): boolean {
    const next: FieldErrors = {}
    if (values.name.trim().length < 2) next.name = t('form.required')
    if (!EMAIL_RE.test(values.email)) next.email = t('form.invalidEmail')
    if (values.message.trim().length < 5) next.message = t('form.required')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setFailed(false)
    if (!validate()) return

    try {
      await submit({ variables: { input: values } })
      setValues({ name: '', email: '', message: '' })
    } catch {
      setFailed(true)
    }
  }

  if (succeeded) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <p className="font-medium">{t('form.success')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field label={t('form.name')} error={errors.name}>
        <Input
          value={values.name}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }}
          placeholder={t('form.namePlaceholder')}
          autoComplete="name"
        />
      </Field>

      <Field label={t('form.email')} error={errors.email}>
        <Input
          type="email"
          value={values.email}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }}
          placeholder={t('form.emailPlaceholder')}
          autoComplete="email"
        />
      </Field>

      <Field label={t('form.message')} error={errors.message}>
        <Textarea
          value={values.message}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }}
          placeholder={t('form.messagePlaceholder')}
          rows={5}
        />
      </Field>

      {failed && <p className="text-sm text-red-500">{t('form.error')}</p>}

      <Button type="submit" disabled={loading} size="lg" className="self-start">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? t('form.sending') : t('form.submit')}
      </Button>
    </form>
  )
}

function Field({
  label,
  error,
  children
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}

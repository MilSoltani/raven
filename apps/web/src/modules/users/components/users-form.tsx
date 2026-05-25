import type { CreateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/common/components/ui/alert'
import { Button } from '@raven/web/common/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { cn } from '@raven/web/common/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type UsersFormProps = {
  initialData?: CreateUserPayload
  onSubmit: (data: CreateUserPayload, setError: UseFormSetError<CreateUserPayload>) => void
  isPending: boolean
}

export function UsersForm({ initialData, onSubmit, isPending }: UsersFormProps) {
  const { t } = useTranslation('ui')

  const isEditMode = !!initialData

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserPayloadSchema),
    mode: 'onBlur',
    values: initialData || { email: '', name: '' },
  })

  const handleFormSubmit = form.handleSubmit((data) => {
    onSubmit(data, form.setError)
  })

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
    >
      {form.formState.errors.root?.serverError?.message && (
        <Alert variant="destructive">
          <IconAlertCircle />
          <AlertTitle>{isEditMode ? 'Update failed' : 'User creation failed'}</AlertTitle>
          <AlertDescription>
            {form.formState.errors.root.serverError?.message}
          </AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">{t('USER_NAME')}</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            aria-invalid={!!form.formState.errors.name}
            className={cn(
              form.formState.errors.name && 'border-destructive focus-visible:ring-destructive/50',
            )}
            {...form.register('name')}
            required
          />
          {form.formState.errors.name?.message && (
            <FieldDescription className="text-destructive">
              {form.formState.errors.name.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">{t('USER_EMAIL')}</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            aria-invalid={!!form.formState.errors.email}
            className={cn(
              form.formState.errors.email && 'border-destructive focus-visible:ring-destructive/50',
            )}
            {...form.register('email')}
            required
          />
          {form.formState.errors.email?.message && (
            <FieldDescription className="text-destructive">
              {form.formState.errors.email.message}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-4"
      >
        {isPending
          ? '...'
          : isEditMode ? t('USER_UPDATE') : t('USER_CREATE')}
      </Button>
    </form>
  )
}

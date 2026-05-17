import type { CreateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/components/ui/alert'
import { Button } from '@raven/web/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@raven/web/components/ui/field'
import { Input } from '@raven/web/components/ui/input'
import { cn } from '@raven/web/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'

type UsersFormProps = {
  initialData?: CreateUserPayload
  onSubmit: (data: CreateUserPayload, setError: UseFormSetError<CreateUserPayload>) => void
  isPending: boolean
}

export function UsersForm({ initialData, onSubmit, isPending }: UsersFormProps) {
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
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
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
          <FieldLabel htmlFor="email">Email</FieldLabel>
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
          ? isEditMode ? 'Updating...' : 'Creating...'
          : isEditMode ? 'Update User' : 'Create User'}
      </Button>
    </form>
  )
}

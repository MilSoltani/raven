import type { User } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserPayloadSchema, UpdateUserPayloadSchema } from '@raven/api/exports'
import { Alert, AlertDescription } from '@raven/web/common/components/ui/alert'
import { Button } from '@raven/web/common/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { useForm } from 'react-hook-form'

type UsersFormProps = {
  mode?: 'edit' | 'create'
  user: Partial<User>
  submitLabel: string
  isPending?: boolean
  error?: string
  footer?: React.ReactNode
  onSubmit: (data: Partial<User>) => void
}

export function UsersForm({
  mode,
  user,
  submitLabel,
  isPending,
  error,
  footer,
  onSubmit,
}: UsersFormProps) {
  const resoverSchema = mode === 'create'
    ? CreateUserPayloadSchema
    : UpdateUserPayloadSchema

  const { register, handleSubmit, formState: { errors } } = useForm<Partial<User>>({
    resolver: zodResolver(resoverSchema),
    defaultValues: user,
    mode: 'onBlur',
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col"
    >
      <div className="no-scrollbar overflow-y-auto px-4">
        {error && (
          <Alert
            variant="destructive"
            className="mb-4"
          >
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input {...register('name')} />
            {errors.name?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input {...register('email')} />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>

          {mode === 'edit' && (
            <Field>
              <FieldLabel>Created At</FieldLabel>
              <Input
                {...register('createdAt')}
                disabled
              />
            </Field>
          )}

          {mode === 'edit' && (
            <Field>
              <FieldLabel>Updated At</FieldLabel>
              <Input
                {...register('updatedAt')}
                disabled
              />
            </Field>
          )}
        </FieldGroup>

        <div className="mt-5 flex gap-2">
          <Button
            type="submit"
            disabled={isPending}
          >
            {submitLabel}
          </Button>

          {footer}
        </div>
      </div>
    </form>
  )
}

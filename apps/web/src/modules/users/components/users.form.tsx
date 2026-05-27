import type { UpdateUserPayload } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { Alert, AlertDescription } from '@raven/web/common/components/ui/alert'
import { Button } from '@raven/web/common/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { useForm } from 'react-hook-form'

type UsersFormProps = {
  defaultValues?: Partial<UpdateUserPayload>
  submitLabel: string
  isPending?: boolean
  error?: string
  footer?: React.ReactNode
  children?: React.ReactNode
  onSubmit: (data: UpdateUserPayload) => void
}

export function UsersForm({
  defaultValues,
  submitLabel,
  isPending,
  error,
  footer,
  children,
  onSubmit,
}: UsersFormProps) {
  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserPayloadSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col"
    >
      <div className="no-scrollbar overflow-y-auto px-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>

            <Input {...form.register('name')} />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>

            <Input {...form.register('email')} />
          </Field>

          {children}
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

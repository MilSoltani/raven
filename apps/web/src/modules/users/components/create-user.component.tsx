import type { CreateUserPayload } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { useForm } from 'react-hook-form'
import { useCreateUser } from '../hooks/use-create-User'
import { CreateUserDialog } from './create-user.dialog'

export function CreateUserComponent() {
  const create = useCreateUser()

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(data, {
      onError: (err) => {
        form.setError('root.serverError', {
          message: err.message,
        })
      },
    })
  })

  return (
    <CreateUserDialog
      register={form.register}
      errors={form.formState.errors}
      onSubmit={onSubmit}
      isLoading={create.isPending}
    />
  )
}

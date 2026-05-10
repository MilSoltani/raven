import type { LoginPayload } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginPayloadSchema } from '@raven/api/exports'
import { useForm } from 'react-hook-form'
import { LoginForm } from './components/login-form'
import { useLogin } from './hooks/use-login'

export function LoginPage() {
  const login = useLogin()

  const form = useForm<LoginPayload>({
    resolver: zodResolver(LoginPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    login.mutate(data, {
      onError: (err) => {
        form.setError('root.serverError', {
          message: err.message,
        })
      },
    })
  })

  return (
    <LoginForm
      register={form.register}
      errors={form.formState.errors}
      onSubmit={onSubmit}
      isLoading={login.isPending}
    />
  )
}

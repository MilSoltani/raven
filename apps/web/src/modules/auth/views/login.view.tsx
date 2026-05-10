import type { LoginPayload } from '@raven/api/exports'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginPayloadSchema } from '@raven/api/exports'
import { useForm } from 'react-hook-form'
import { useLogin } from '../apis/auth.queries'

export function Login() {
  const login = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    login.mutate(data, {
      onError: (err: any) => {
        Object.entries(err).forEach(([key, value]) => {
          setError(key as any, {
            message: String(value),
          })
        })
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <input
        {...register('email')}
        type="email"
        autoComplete="email"
      />

      {errors.email && <div>{errors.email.message}</div>}

      <input
        {...register('password')}
        type="password"
        autoComplete="current-password"
      />

      {errors.password && <div>{errors.password.message}</div>}

      <button
        type="submit"
        disabled={login.isPending}
      >
        {login.isPending ? 'Logging in' : 'Login'}
      </button>

      {errors.root?.server && (
        <div>{errors.root.server.message}</div>
      )}
    </form>
  )
}

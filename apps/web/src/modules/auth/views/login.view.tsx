import type { LoginPayload } from '@raven/api/exports'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginPayloadSchema } from '@raven/api/exports'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/use-login'

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
      onError: (err) => {
        setError('root.serverError', {
          message: err.message,
        })
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder="Email"
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      </div>

      {errors.root?.serverError && (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          {errors.root.serverError.message}
        </div>
      )}

      <button
        type="submit"
        disabled={login.isPending}
      >
        {login.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

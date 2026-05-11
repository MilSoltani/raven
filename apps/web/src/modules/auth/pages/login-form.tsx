import type { LoginPayload } from '@raven/api/exports'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<LoginPayload>
  errors: FieldErrors<LoginPayload>
  onSubmit: () => void
  isLoading: boolean
}

export function LoginForm({ register, errors, onSubmit, isLoading }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      </div>

      {errors.root?.serverError && (
        <div style={{ color: 'red' }}>
          {errors.root.serverError.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

import type { SignupPayload } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupPayloadSchema } from '@raven/api/exports'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../hooks/use-signup'
import { SignupForm } from './signup-form'

export function SignupPage() {
  const signup = useSignup()
  const navigate = useNavigate()

  const form = useForm<SignupPayload>({
    resolver: zodResolver(SignupPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    signup.mutate(data, {
      onError: (err) => {
        form.setError('root.serverError', {
          message: err.message,
        })
      },
      onSuccess: () => {
        navigate('/')
      },
    })
  })

  return (
    <SignupForm
      register={form.register}
      errors={form.formState.errors}
      onSubmit={onSubmit}
      isLoading={signup.isPending}
    />
  )
}

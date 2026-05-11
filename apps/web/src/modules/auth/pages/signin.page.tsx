import type { SigninPayload } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninPayloadSchema } from '@raven/api/exports'
import { SigninForm } from '@raven/web/modules/auth/pages/signin-form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSignin } from '../hooks/use-signin'

export function SigninPage() {
  const signin = useSignin()
  const navigate = useNavigate()

  const form = useForm<SigninPayload>({
    resolver: zodResolver(SigninPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    signin.mutate(data, {
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
    <SigninForm
      register={form.register}
      errors={form.formState.errors}
      onSubmit={onSubmit}
      isLoading={signin.isPending}
    />
  )
}

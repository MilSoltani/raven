import type { SigninPayload } from '@raven/api/exports'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/common/components/ui/alert'
import { Button } from '@raven/web/common/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@raven/web/common/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { cn } from '@raven/web/common/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

type Props = {
  register: UseFormRegister<SigninPayload>
  errors: FieldErrors<SigninPayload>
  onSubmit: () => void
  isLoading: boolean
}

export function SigninForm({
  register,
  errors,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <img
        src="/icon.png"
        width={32}
        height={32}
        alt=""
      />
      <Card>
        <CardHeader>
          <CardTitle>Sign into your account</CardTitle>

          <CardDescription>
            Enter your email below to sign into your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={onSubmit}
            noValidate
          >
            <FieldGroup>
              {errors.root?.serverError?.message && (
                <Alert variant="destructive">
                  <IconAlertCircle />
                  <AlertTitle>Signin failed</AlertTitle>
                  <AlertDescription>
                    {errors.root.serverError?.message}
                  </AlertDescription>
                </Alert>
              )}

              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-invalid={!!errors.email}
                  className={cn(
                    errors.email
                    && 'border-destructive focus-visible:ring-destructive/50',
                  )}
                  {...register('email')}
                  required
                />

                {errors.email?.message && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                  className={cn(
                    errors.password
                    && 'border-destructive focus-visible:ring-destructive/50',
                  )}
                  {...register('password')}
                  required
                />

                {errors.password?.message && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading
                    ? 'Signing in...'
                    : 'Sign in'}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?
                  {' '}
                  <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

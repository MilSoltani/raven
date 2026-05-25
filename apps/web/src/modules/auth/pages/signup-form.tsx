import type { SignupPayload } from '@raven/api/exports'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/components/ui/alert'
import { Button } from '@raven/web/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@raven/web/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@raven/web/components/ui/field'
import { Input } from '@raven/web/components/ui/input'
import { cn } from '@raven/web/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

type Props = {
  register: UseFormRegister<SignupPayload>
  errors: FieldErrors<SignupPayload>
  onSubmit: () => void
  isLoading: boolean
}

export function SignupForm({
  register,
  errors,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
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
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  className={cn(
                    errors.name
                    && 'border-destructive focus-visible:ring-destructive/50',
                  )}
                  {...register('name')}
                  required
                />

                {errors.name?.message && (
                  <FieldDescription className="text-destructive">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
              <FieldGroup>
                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Signing up...'
                      : 'Sign up'}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account?
                    {' '}
                    <Link to="/signin">Sign In</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import type { CreateUserPayload } from '@raven/api/exports'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/components/ui/alert'
import { Button } from '@raven/web/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@raven/web/components/ui/dialog'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@raven/web/components/ui/field'
import { Input } from '@raven/web/components/ui/input'
import { cn } from '@raven/web/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'

type Props = {
  register: UseFormRegister<CreateUserPayload>
  errors: FieldErrors<CreateUserPayload>
  onSubmit: () => void
  isLoading: boolean
}

export function CreateUserDialog({
  register,
  errors,
  onSubmit,
  isLoading,
}: Props) {
  const [open, setOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    onSubmit()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {errors.root?.serverError?.message && (
            <Alert variant="destructive">
              <IconAlertCircle />
              <AlertTitle>User creation failed</AlertTitle>
              <AlertDescription>
                {errors.root.serverError?.message}
              </AlertDescription>
            </Alert>
          )}
          <DialogHeader>
            <DialogTitle>New user</DialogTitle>
            <DialogDescription>
              Create a new user
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
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
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? 'Creating...'
                : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

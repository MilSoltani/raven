import type { UpdateUserPayload, User } from '@raven/api/exports'
import type { useDeleteUser, useUpdateUser } from '../hooks/users.hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { Alert, AlertDescription, AlertTitle } from '@raven/web/common/components/ui/alert'
import { Button } from '@raven/web/common/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@raven/web/common/components/ui/drawer'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { cn } from '@raven/web/common/lib/utils'
import { IconAlertCircle, IconEye } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type UsersDetailsProps = {
  user: User
  updateUser: ReturnType<typeof useUpdateUser>
  deleteUser: ReturnType<typeof useDeleteUser>
}

export function UsersDetails({
  user,
  updateUser,
  deleteUser,
}: UsersDetailsProps) {
  const { t } = useTranslation('ui')

  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    updateUser.mutate(
      {
        id: user.id,
        data,
      },
      {
        onError: (err) => {
          form.setError('root.serverError', {
            message: err.message,
          })
        },
      },
    )
  })

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <IconEye className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-[400px] data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex h-full flex-col"
        >
          <div className="no-scrollbar overflow-y-auto px-4">
            {form.formState.errors.root?.serverError?.message && (
              <Alert variant="destructive">
                <IconAlertCircle />

                <AlertTitle>
                  {t('USER_UPDATE_FAILED')}
                </AlertTitle>

                <AlertDescription>
                  {form.formState.errors.root.serverError.message}
                </AlertDescription>
              </Alert>
            )}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">
                  {t('USER_NAME')}
                </FieldLabel>

                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={!!form.formState.errors.name}
                  className={cn(
                    form.formState.errors.name
                    && 'border-destructive focus-visible:ring-destructive/50',
                  )}
                  {...form.register('name')}
                  required
                />

                {form.formState.errors.name?.message && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.name.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">
                  {t('USER_EMAIL')}
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  className={cn(
                    form.formState.errors.email
                    && 'border-destructive focus-visible:ring-destructive/50',
                  )}
                  {...form.register('email')}
                  required
                />

                {form.formState.errors.email?.message && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="createdAt">
                  Created At
                </FieldLabel>

                <Input
                  id="createdAt"
                  type="input"
                  value={user.createdAt}
                  disabled
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="updatedAt">
                  Updated At
                </FieldLabel>

                <Input
                  id="updatedAt"
                  type="input"
                  value={user.updatedAt ?? ''}
                  disabled
                />
              </Field>
            </FieldGroup>
          </div>

          <DrawerFooter className="flex flex-row justify-start">
            <DrawerClose asChild>
              <Button variant="outline">
                Close
              </Button>
            </DrawerClose>

            <Button
              type="submit"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending
                ? '...'
                : t('USER_UPDATE')}
            </Button>

            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                deleteUser.mutate(user.id)
              }}
            >
              Delete
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

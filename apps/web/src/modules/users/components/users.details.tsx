import type { User } from '@raven/api/exports'
import type { useDeleteUser, useUpdateUser } from '../hooks/users.hooks'
import { Button } from '@raven/web/common/components/ui/button'
import { Field, FieldLabel } from '@raven/web/common/components/ui/field'
import { Input } from '@raven/web/common/components/ui/input'
import { UsersForm } from './users.form'

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
  return (
    <UsersForm
      submitLabel="update"
      defaultValues={{
        name: user.name,
        email: user.email,
      }}
      isPending={updateUser.isPending}
      error={updateUser.error?.message}
      onSubmit={(data) => {
        updateUser.mutate({
          id: user.id,
          data,
        })
      }}
      footer={(
        <Button
          variant="destructive"
          onClick={() => deleteUser.mutate(user.id)}
        >
          Delete
        </Button>
      )}
    >
      <Field>
        <FieldLabel>Created At</FieldLabel>
        <Input
          value={user.createdAt}
          disabled
        />
      </Field>

      <Field>
        <FieldLabel>Updated At</FieldLabel>
        <Input
          value={user.updatedAt ?? ''}
          disabled
        />
      </Field>
    </UsersForm>
  )
}

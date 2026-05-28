import type { User } from '@raven/api/exports'
import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { Button } from '@raven/web/common/components/ui/button'
import { IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { useUpdateUser } from '../hooks/users.hooks'
import { UsersForm } from './users.form'

type UserActionCellProps = {
  user: User
}

export function UserActionCell({ user }: UserActionCellProps) {
  const updateUser = useUpdateUser()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppDrawer
      open={isOpen}
      onOpenChange={setIsOpen}
      drawerTitle="User Details"
      drawerDescription={`Editing details for ${user.name}`}
      pageLinkUrl={`/users/${user.id}`}
      triggerButton={(
        <Button
          variant="outline"
          size="icon"
        >
          <IconLayoutSidebarRightExpandFilled className="h-4 w-4" />
        </Button>
      )}
      drawerBody={(
        <UsersForm
          mode="edit"
          user={user}
          error={updateUser.error?.message}
          onSubmit={(data) => {
            updateUser.mutate({
              id: user.id,
              data: UpdateUserPayloadSchema.parse(data),
            }, { onSuccess: () => setIsOpen(false) })
          }}
          footer={(
            <Button
              type="submit"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending ? 'Updating...' : 'Update'}
            </Button>
          )}
        />
      )}
    />
  )
}

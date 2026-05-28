import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { AppDrawer } from '@raven/web/common/components/app.drawer'
import { Button } from '@raven/web/common/components/ui/button'
import { IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { useUpdateUser, useUser } from '../hooks/users.hooks'
import { UsersForm } from './users.form'

type UserActionCellProps = {
  userId: number
}

export function UserActionCell({ userId }: UserActionCellProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, isError, error } = useUser(userId, isOpen)
  const updateUser = useUpdateUser()

  if (!userId || Number.isNaN(userId)) {
    return <div>Invalid user id</div>
  }

  return (
    <AppDrawer
      open={isOpen}
      onOpenChange={setIsOpen}
      drawerTitle="User Details"
      drawerDescription={
        data?.user ? `Editing details for ${data.user.name}` : 'Loading user...'
      }
      pageLinkUrl={data?.user ? `/users/${data.user.id}` : undefined}
      triggerButton={(
        <Button
          variant="outline"
          size="icon"
        >
          <IconLayoutSidebarRightExpandFilled className="h-4 w-4" />
        </Button>
      )}
      drawerBody={
        isLoading
          ? (<div>Loading user...</div>)
          : isError
            ? (
                <div>
                  Error:
                  {error instanceof Error ? error.message : ''}
                </div>
              )
            : data?.user
              ? (
                  <UsersForm
                    mode="edit"
                    user={data.user}
                    error={updateUser.error?.message}
                    onSubmit={(formData) => {
                      updateUser.mutate(
                        {
                          id: data.user.id,
                          data: UpdateUserPayloadSchema.parse(formData),
                        },
                        { onSuccess: () => setIsOpen(false) },
                      )
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
                )
              : (<div>Open drawer to load user</div>)
      }
    />
  )
}

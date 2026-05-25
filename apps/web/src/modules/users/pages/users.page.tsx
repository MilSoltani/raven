import type { CreateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form'
import { Button } from '@raven/web/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@raven/web/components/ui/dialog'
import { useState } from 'react'
import { UsersForm } from '../components/users-form'
import { UsersList } from '../components/users-list'
import { useCreateUser, useUsers } from '../hooks/users.hooks'

export function UsersPage() {
  const [open, setOpen] = useState(false)

  const { data, isLoading, isError, error } = useUsers({ select: ['name', 'email'] })

  const create = useCreateUser()

  const handleCreate = (
    data: CreateUserPayload,
    setError: UseFormSetError<CreateUserPayload>,
  ) => {
    create.mutate(data, {
      onError: (err) => {
        setError('root.serverError', { message: err.message })
      },

      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  if (isLoading)
    return <div>Loading users...</div>

  if (isError || !data) {
    return (
      <div>
        Error:
        {error?.message}
      </div>
    )
  }

  const { users } = data

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New user</DialogTitle>
            <DialogDescription>
              Create a new user
            </DialogDescription>
          </DialogHeader>

          <UsersForm
            onSubmit={handleCreate}
            isPending={create.isPending}
          />
        </DialogContent>
      </Dialog>

      <UsersList users={users} />
    </div>

  )
}

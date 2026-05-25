import type { CreateUserPayload } from '@raven/api/exports'
import type { UseFormSetError } from 'react-hook-form'
import { Button } from '@raven/web/common/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@raven/web/common/components/ui/dialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UsersForm } from '../components/users-form'
import { UsersList } from '../components/users-list'
import { useCreateUser, useUsers } from '../hooks/users.hooks'

export function UsersPage() {
  const { t } = useTranslation('ui')
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
          <Button variant="outline">{t('NEW_USER')}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('NEW_USER')}</DialogTitle>
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

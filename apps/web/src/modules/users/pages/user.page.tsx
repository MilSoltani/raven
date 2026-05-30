import { UpdateUserPayloadSchema } from '@raven/api/exports'
import { Button } from '@raven/web/common/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { UsersForm } from '../components/users.form'
import { useUpdateUser, useUser } from '../hooks/users.hooks'
import { usersUiKeys } from '../locales/users-ui.keys'

export function UserPage() {
  const { id } = useParams<{ id: string }>()

  const userId = id ? Number(id) : Number.NaN

  const { data, isLoading, isError, error } = useUser(userId)
  const updateUser = useUpdateUser()
  const { t } = useTranslation('ui')

  if (!id || Number.isNaN(userId)) {
    return <div>{t(usersUiKeys.ui.invalidUserId)}</div>
  }

  if (isLoading) {
    return (
      <div>
        {t(usersUiKeys.ui.loading)}
        ...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div>
        {t(usersUiKeys.ui.loadingError)}
        :
        {error instanceof Error ? error.message : ''}
      </div>
    )
  }

  return (
    <UsersForm
      mode="edit"
      user={data.user}
      error={updateUser.error?.message}
      onSubmit={(formData) => {
        updateUser.mutate({
          id: userId,
          data: UpdateUserPayloadSchema.parse(formData),
        })
      }}
      footer={(
        <Button
          type="submit"
          disabled={updateUser.isPending}
        >
          {updateUser.isPending ? t(usersUiKeys.form.updating) : t(usersUiKeys.form.update)}
        </Button>
      )}
    />
  )
}

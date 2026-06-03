import { IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react'
import { UpdateUserPayloadSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppDrawer } from '@xenon/web/common/components/app.drawer'
import { Button } from '@xenon/web/common/components/ui/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateUser, useUser } from '../hooks/users.hooks'
import { UsersForm } from './users.form'

type UserActionCellProps = {
	userId: number
}

export function UserActionCell({ userId }: UserActionCellProps) {
	const { t } = useTranslation('web')
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading, isError, error } = useUser(userId, isOpen)
	const updateUser = useUpdateUser()

	if (!userId || Number.isNaN(userId)) {
		return <div>{t(translationKey('users.ui.invalidId'))}</div>
	}

	return (
		<AppDrawer
			open={isOpen}
			onOpenChange={setIsOpen}
			drawerTitle={t(translationKey('users.ui.details'))}
			drawerDescription={t(translationKey('users.ui.drawerDescription'))}
			pageLinkUrl={data ? `/users/${data.id}` : undefined}
			triggerButton={
				<Button
					variant="outline"
					size="icon"
					onClick={(e) => {
						;(e.currentTarget as HTMLButtonElement).blur()
					}}
				>
					<IconLayoutSidebarRightExpandFilled className="h-4 w-4" />
				</Button>
			}
			drawerBody={
				isLoading ? (
					<div>{t('users.ui.loading')}</div>
				) : isError ? (
					<div>
						{t('users.ui.loadingError')}:
						{error instanceof Error ? error.message : ''}
					</div>
				) : data ? (
					<UsersForm
						mode="edit"
						user={data}
						error={updateUser.error?.message}
						onSubmit={(formData) => {
							updateUser.mutate(
								{
									id: data.id,
									data: UpdateUserPayloadSchema.parse(formData),
								},
								{ onSuccess: () => setIsOpen(false) },
							)
						}}
						footer={
							<Button type="submit" disabled={updateUser.isPending}>
								{updateUser.isPending
									? t('users.form.updating')
									: t('users.form.update')}
							</Button>
						}
					/>
				) : (
					<div>{t('users.ui.openDrawerNotice')}</div>
				)
			}
		/>
	)
}

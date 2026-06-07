import { IconPlus } from '@tabler/icons-react'
import { CreateUserPayloadSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppSheet } from '@xenon/web/common/components/app.sheet'
import { Button } from '@xenon/web/common/components/ui/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateUser } from '../hooks/users.hooks'
import { UsersForm } from './users.form'

export function CreateUser() {
	const [sheetOpen, setSheetOpen] = useState(false)
	const createUser = useCreateUser()
	const { t } = useTranslation('web')

	return (
		<AppSheet
			open={sheetOpen}
			onOpenChange={setSheetOpen}
			sheetTitle="New User"
			sheetDescription=""
			sheetBody={
				<UsersForm
					mode="create"
					user={{ name: '', email: '' }}
					error={createUser.error?.message}
					onSubmit={(data) => {
						createUser.mutate(CreateUserPayloadSchema.parse(data), {
							onSuccess: () => setSheetOpen(false),
						})
					}}
					footer={
						<Button type="submit" disabled={createUser.isPending}>
							{createUser.isPending
								? t(translationKey('users.form.creating'))
								: t(translationKey('users.form.create'))}
						</Button>
					}
				/>
			}
			triggerButton={
				<Button variant="outline">
					<IconPlus className="h-4 w-4 me-1" />
					{t(translationKey('users.form.create'))}
				</Button>
			}
		/>
	)
}

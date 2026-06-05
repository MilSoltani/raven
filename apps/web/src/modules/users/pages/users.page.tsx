import { IconPlus, IconTrash } from '@tabler/icons-react'
import type { SortingState } from '@tanstack/react-table'
import type { Criteria } from '@xenon/api/exports'
import { CreateUserPayloadSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppDialog } from '@xenon/web/common/components/app.dialog'
import { AppSheet } from '@xenon/web/common/components/app.sheet'
import { DataTable } from '@xenon/web/common/components/data.table'
import { AlertDialogAction } from '@xenon/web/common/components/ui/alert-dialog'
import { Button } from '@xenon/web/common/components/ui/button'
import {
	sortingToSort,
	sortToSorting,
} from '@xenon/web/common/utils/sorting-adapters'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserColumns } from '../components/users.columns'
import { UsersForm } from '../components/users.form'
import { useCreateUser, useDeleteUser, useUsers } from '../hooks/users.hooks'

export function UsersPage() {
	const { t } = useTranslation('web')
	const [rowSelection, setRowSelection] = useState({})
	const [sheetOpen, setSheetOpen] = useState(false)

	const [criteria, setCriteria] = useState<Criteria>({
		select: ['name', 'email', 'createdAt', 'updatedAt'],
		page: 1,
		limit: 10,
		sort: {
			name: 'asc',
		},
	})

	const { data, isLoading, isError, error } = useUsers(criteria)

	const createUser = useCreateUser()
	const deleteUser = useDeleteUser()
	const columns = useUserColumns()

	if (isLoading) {
		return (
			<div>
				{t(translationKey('users.ui.loading'))}
				...
			</div>
		)
	}

	if (isError || !data) {
		return (
			<div>
				{t(translationKey('users.ui.loadingError'))}:{error?.message}
			</div>
		)
	}

	const { items, meta } = data

	const safePagination = meta ?? {
		page: 1,
		pageSize: 10,
		totalItems: 0,
		totalPages: 1,
		hasNextPage: false,
		hasPreviousPage: false,
	}

	const sorting: SortingState = sortToSorting(criteria.sort)

	return (
		<div>
			<div className="flex flex-row justify-end gap-4">
				<AppDialog
					triggerButton={
						<Button
							variant="destructive"
							disabled={Object.entries(rowSelection).length === 0}
						>
							<IconTrash className="h-4 w-4 me-1" />
							{t(translationKey('users.form.delete'))}
						</Button>
					}
					title={t(translationKey('users.form.deleteDialogTitle'))}
					description={t(translationKey('users.form.deleteDialogDescription'))}
					dialogAction={
						<AlertDialogAction
							variant={'destructive'}
							onClick={() => {
								Object.entries(rowSelection).forEach(([key, isSelected]) => {
									if (isSelected) {
										const index = Number(key)
										const userToDelete = items[index]

										if (userToDelete) {
											deleteUser.mutate(userToDelete.id)
										}
									}
								})
								setRowSelection({})
							}}
						>
							<IconTrash className="h-4 w-4 me-1" />
							{t(translationKey('users.form.delete'))}
						</AlertDialogAction>
					}
				/>

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
										? t('users.form.creating')
										: t('users.form.create')}
								</Button>
							}
						/>
					}
					triggerButton={
						<Button variant="outline">
							<IconPlus className="h-4 w-4 me-1" />
							{t('users.form.create')}
						</Button>
					}
				/>
			</div>

			<DataTable
				columns={columns}
				data={items}
				pagination={safePagination}
				sorting={sorting}
				onPaginationChange={(p) =>
					setCriteria((prev) => ({
						...prev,
						page: p.page,
						limit: p.pageSize,
					}))
				}
				onSortingChange={(s) =>
					setCriteria((prev) => ({
						...prev,
						page: 1,
						sort: sortingToSort(s),
					}))
				}
				rowSelection={rowSelection}
				onRowSelectionChange={setRowSelection}
			/>
		</div>
	)
}

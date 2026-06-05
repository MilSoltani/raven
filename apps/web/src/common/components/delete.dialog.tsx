import { IconTrash } from '@tabler/icons-react'
import { AppDialog } from './app.dialog'
import { AlertDialogAction } from './ui/alert-dialog'
import { Button } from './ui/button'

type DeleteDialogProps = {
	disabled: boolean
	title: string
	description: string
	triggerLabel: string
	actionLabel: string

	selectedIds: number[]
	onDelete: (id: number) => void
	onResetSelection: () => void
}

export function DeleteDialog({
	disabled,
	title,
	description,
	triggerLabel,
	actionLabel,
	selectedIds,
	onDelete,
	onResetSelection,
}: DeleteDialogProps) {
	return (
		<AppDialog
			triggerButton={
				<Button variant="destructive" disabled={disabled}>
					<IconTrash className="h-4 w-4 me-1" />
					{triggerLabel}
				</Button>
			}
			title={title}
			description={description}
			dialogAction={
				<AlertDialogAction
					variant="destructive"
					onClick={() => {
						selectedIds.forEach(onDelete)
						onResetSelection()
					}}
				>
					<IconTrash className="h-4 w-4 me-1" />
					{actionLabel}
				</AlertDialogAction>
			}
		/>
	)
}

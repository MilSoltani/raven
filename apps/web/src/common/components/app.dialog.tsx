import { IconCancel } from '@tabler/icons-react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'

type AppDialogProps = {
	title: string
	description: string
	triggerButton: React.ReactNode
	dialogAction: React.ReactNode
}

export function AppDialog({
	triggerButton,
	title,
	description,
	dialogAction,
}: AppDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						<IconCancel className="h-4 w-4 me-1" />
						cancel
					</AlertDialogCancel>
					{dialogAction}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

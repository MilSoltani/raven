import { IconArrowsMaximize, IconX } from '@tabler/icons-react'
import { Button } from '@xenon/web/common/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@xenon/web/common/components/ui/sheet'
import { Link } from 'react-router-dom'

type AppSheetProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	sheetTitle: string
	sheetBody: React.ReactNode
	pageLinkUrl?: string
	sheetDescription: string
	width?: string
	triggerButton: React.ReactNode
}

export function AppSheet({
	open,
	onOpenChange,
	sheetTitle,
	sheetBody,
	pageLinkUrl,
	sheetDescription,
	width = 'w-[400px]',
	triggerButton,
}: AppSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{triggerButton}</SheetTrigger>

			<SheetContent side="right" className={width} showCloseButton={false}>
				<SheetHeader>
					<div className="flex flex-row items-center justify-between">
						<SheetTitle>{sheetTitle}</SheetTitle>

						<div className="flex items-center gap-2">
							{pageLinkUrl && (
								<Button variant="ghost" size="icon" asChild>
									<Link to={pageLinkUrl} viewTransition>
										<IconArrowsMaximize className="w-4 h-4" />
									</Link>
								</Button>
							)}

							<SheetClose asChild>
								<Button variant="ghost" size="icon">
									<IconX className="w-4 h-4" />
								</Button>
							</SheetClose>
						</div>
					</div>

					<SheetDescription>{sheetDescription}</SheetDescription>
				</SheetHeader>

				<div className="flex h-full flex-col mt-4 overflow-y-auto">
					{sheetBody}
				</div>
			</SheetContent>
		</Sheet>
	)
}

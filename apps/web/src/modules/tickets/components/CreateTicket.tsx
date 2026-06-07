import { IconPlus } from '@tabler/icons-react'
import { CreateTicketSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppSheet } from '@xenon/web/common/components/app.sheet'
import { Button } from '@xenon/web/common/components/ui/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TicketsForm } from '../components/tickets.form'
import { useCreateTicket } from '../hooks/tickets.hooks'

export function CreateTicket() {
	const [sheetOpen, setSheetOpen] = useState(false)
	const createTicket = useCreateTicket()
	const { t } = useTranslation('web')

	return (
		<AppSheet
			open={sheetOpen}
			onOpenChange={setSheetOpen}
			sheetTitle="New Ticket"
			sheetDescription=""
			sheetBody={
				<TicketsForm
					mode="create"
					ticket={{ subject: '' }}
					error={createTicket.error?.message}
					onSubmit={(data) => {
						createTicket.mutate(CreateTicketSchema.parse(data), {
							onSuccess: () => setSheetOpen(false),
						})
					}}
					footer={
						<Button type="submit" disabled={createTicket.isPending}>
							{createTicket.isPending
								? t(translationKey('tickets.form.creating'))
								: t(translationKey('tickets.form.create'))}
						</Button>
					}
				/>
			}
			triggerButton={
				<Button variant="outline">
					<IconPlus className="h-4 w-4 me-1" />
					{t(translationKey('tickets.form.create'))}
				</Button>
			}
		/>
	)
}

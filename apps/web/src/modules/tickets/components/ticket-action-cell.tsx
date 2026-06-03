import { IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react'
import { UpdateTicketSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { AppDrawer } from '@xenon/web/common/components/app.drawer'
import { Button } from '@xenon/web/common/components/ui/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTicket, useUpdateTicket } from '../hooks/tickets.hooks'
import { TicketsForm } from './tickets.form'

type TicketActionCellProps = {
	ticketId: number
}

export function TicketActionCell({ ticketId }: TicketActionCellProps) {
	const { t } = useTranslation('web')
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading, isError, error } = useTicket(ticketId, isOpen)
	const updateTicket = useUpdateTicket()

	if (!ticketId || Number.isNaN(ticketId)) {
		return <div>{t(translationKey('tickets.ui.invalidId'))}</div>
	}

	return (
		<AppDrawer
			open={isOpen}
			onOpenChange={setIsOpen}
			drawerTitle={t(translationKey('tickets.ui.details'))}
			drawerDescription={t(translationKey('tickets.ui.drawerDescription'))}
			pageLinkUrl={data ? `/tickets/${data.id}` : undefined}
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
					<div>{t('tickets.ui.loading')}</div>
				) : isError ? (
					<div>
						{t('tickets.ui.loadingError')}:
						{error instanceof Error ? error.message : ''}
					</div>
				) : data ? (
					<TicketsForm
						mode="edit"
						ticket={data}
						error={updateTicket.error?.message}
						onSubmit={(formData) => {
							updateTicket.mutate(
								{
									id: data.id,
									data: UpdateTicketSchema.parse(formData),
								},
								{ onSuccess: () => setIsOpen(false) },
							)
						}}
						footer={
							<Button type="submit" disabled={updateTicket.isPending}>
								{updateTicket.isPending
									? t('tickets.form.updating')
									: t('tickets.form.update')}
							</Button>
						}
					/>
				) : (
					<div>{t('tickets.ui.openDrawerNotice')}</div>
				)
			}
		/>
	)
}

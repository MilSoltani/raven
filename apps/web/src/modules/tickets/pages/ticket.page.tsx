import { UpdateTicketSchema } from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { Button } from '@xenon/web/common/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { TicketsForm } from '../components/tickets.form'
import { useTicket, useUpdateTicket } from '../hooks/tickets.hooks'

export function TicketPage() {
	const { id } = useParams<{ id: string }>()

	const ticketId = id ? Number(id) : Number.NaN

	const { data, isLoading, isError, error } = useTicket(ticketId)
	const updateTicket = useUpdateTicket()
	const { t } = useTranslation('web')

	if (!id || Number.isNaN(ticketId)) {
		return <div>{t('tickets.ui.invalidId')}</div>
	}

	if (isLoading) {
		return (
			<div>
				{t(translationKey('tickets.ui.loading'))}
				...
			</div>
		)
	}

	if (isError || !data) {
		return (
			<div>
				{t(translationKey('tickets.ui.loadingError'))}:
				{error instanceof Error ? error.message : ''}
			</div>
		)
	}

	return (
		<TicketsForm
			mode="edit"
			ticket={data}
			error={updateTicket.error?.message}
			onSubmit={(formData) => {
				updateTicket.mutate({
					id: ticketId,
					data: UpdateTicketSchema.parse(formData),
				})
			}}
			footer={
				<Button type="submit" disabled={updateTicket.isPending}>
					{updateTicket.isPending
						? t('tickets.form.updating')
						: t('tickets.form.update')}
				</Button>
			}
		/>
	)
}

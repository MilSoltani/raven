import { zodResolver } from '@hookform/resolvers/zod'
import type { Ticket } from '@xenon/api/exports'
import { CreateTicketSchema, UpdateTicketSchema } from '@xenon/api/exports'
import { Alert, AlertDescription } from '@xenon/web/common/components/ui/alert'
import {
	Field,
	FieldGroup,
	FieldLabel,
} from '@xenon/web/common/components/ui/field'
import { Input } from '@xenon/web/common/components/ui/input'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TicketsFormProps = {
	mode?: 'edit' | 'create'
	ticket: Partial<Ticket>
	error?: string
	footer?: React.ReactNode
	onSubmit: (data: Partial<Ticket>) => void
}

export function TicketsForm({
	mode,
	ticket,
	error,
	footer,
	onSubmit,
}: TicketsFormProps) {
	const resoverSchema =
		mode === 'create' ? CreateTicketSchema : UpdateTicketSchema

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Partial<Ticket>>({
		resolver: zodResolver(resoverSchema),
		defaultValues: ticket,
		mode: 'onBlur',
	})

	const { t } = useTranslation('web')

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
			<div className="no-scrollbar overflow-y-auto px-4">
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<FieldGroup>
					<Field>
						<FieldLabel>{t('tickets.entity.subject')}</FieldLabel>
						<Input {...register('subject')} />
						{errors.subject?.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.subject.message}
							</p>
						)}
					</Field>

					{mode === 'edit' && (
						<Field>
							<FieldLabel>{t('tickets.entity.createdAt')}</FieldLabel>
							<Input {...register('createdAt')} disabled />
						</Field>
					)}

					{mode === 'edit' && (
						<Field>
							<FieldLabel>{t('tickets.entity.updatedAt')}</FieldLabel>
							<Input {...register('updatedAt')} disabled />
						</Field>
					)}
				</FieldGroup>

				<div className="mt-5 flex gap-2">{footer}</div>
			</div>
		</form>
	)
}

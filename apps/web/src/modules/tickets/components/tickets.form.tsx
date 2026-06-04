import { zodResolver } from '@hookform/resolvers/zod'
import type { Ticket } from '@xenon/api/exports'
import {
	CreateTicketSchema,
	TicketPriorityEnum,
	TicketStatusEnum,
	UpdateTicketSchema,
} from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { Alert, AlertDescription } from '@xenon/web/common/components/ui/alert'
import {
	Field,
	FieldGroup,
	FieldLabel,
} from '@xenon/web/common/components/ui/field'
import { Input } from '@xenon/web/common/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@xenon/web/common/components/ui/select'
import { Textarea } from '@xenon/web/common/components/ui/textarea'
import { Controller, useForm } from 'react-hook-form'
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
		control,
		getValues,
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
						<FieldLabel>
							{t(translationKey('tickets.entity.subject'))}
						</FieldLabel>
						<Input {...register('subject')} />
						{errors.subject?.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.subject.message}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel>
							{t(translationKey('tickets.entity.description'))}
						</FieldLabel>
						<Textarea rows={8} {...register('description')} />
						{errors.description?.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.description.message}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel>
							{t(translationKey('tickets.entity.priority'))}
						</FieldLabel>

						<Controller
							name="priority"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full max-w-48">
										<SelectValue placeholder="Select" />
									</SelectTrigger>

									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												{t(translationKey('tickets.entity.priority'))}
											</SelectLabel>

											{TicketPriorityEnum.options.map((option) => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
					</Field>

					{mode === 'edit' && (
						<Field>
							<FieldLabel>
								{t(translationKey('tickets.entity.status'))}
							</FieldLabel>

							<Controller
								name="status"
								control={control}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-full max-w-48">
											<SelectValue placeholder="Select" />
										</SelectTrigger>

										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													{t(translationKey('tickets.entity.status'))}
												</SelectLabel>

												{TicketStatusEnum.options.map((option) => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
						</Field>
					)}

					{mode === 'edit' && (
						<div className="flex flex-row gap-15">
							<div>
								<FieldLabel>
									{t(translationKey('tickets.entity.createdAt'))}
								</FieldLabel>
								<div className="text-sm">
									{getValues('createdAt')?.toLocaleDateString() ?? '—'}
								</div>
							</div>

							<div>
								<FieldLabel>
									{t(translationKey('tickets.entity.updatedAt'))}
								</FieldLabel>
								<div className="text-sm">
									{getValues('updatedAt')?.toLocaleDateString() ?? '—'}
								</div>
							</div>
						</div>
					)}
				</FieldGroup>

				<div className="mt-5 flex gap-2">{footer}</div>
			</div>
		</form>
	)
}

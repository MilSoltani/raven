import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@xenon/api/exports'
import {
	CreateUserPayloadSchema,
	UpdateUserPayloadSchema,
} from '@xenon/api/exports'
import { translationKey } from '@xenon/i18n'
import { Alert, AlertDescription } from '@xenon/web/common/components/ui/alert'
import {
	Field,
	FieldGroup,
	FieldLabel,
} from '@xenon/web/common/components/ui/field'
import { Input } from '@xenon/web/common/components/ui/input'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type UsersFormProps = {
	mode?: 'edit' | 'create'
	user: Partial<User>
	error?: string
	footer?: React.ReactNode
	onSubmit: (data: Partial<User>) => void
}

export function UsersForm({
	mode,
	user,
	error,
	footer,
	onSubmit,
}: UsersFormProps) {
	const resoverSchema =
		mode === 'create' ? CreateUserPayloadSchema : UpdateUserPayloadSchema

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Partial<User>>({
		resolver: zodResolver(resoverSchema),
		defaultValues: user,
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
						<FieldLabel>{t(translationKey('users.entity.name'))}</FieldLabel>
						<Input {...register('name')} />
						{errors.name?.message && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</Field>

					<Field>
						<FieldLabel>{t(translationKey('users.entity.email'))}</FieldLabel>
						<Input {...register('email')} />
						{errors.email?.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</Field>

					{mode === 'edit' && (
						<div className="flex flex-row gap-15">
							<div>
								<FieldLabel>
									{t(translationKey('users.entity.createdAt'))}
								</FieldLabel>
								<div className="text-sm">
									{getValues('createdAt')?.toLocaleDateString() ?? '—'}
								</div>
							</div>

							<div>
								<FieldLabel>
									{t(translationKey('users.entity.updatedAt'))}
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

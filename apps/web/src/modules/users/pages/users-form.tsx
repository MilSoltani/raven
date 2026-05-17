import type { CreateUserPayload, PaginatedResult, User } from '@raven/api/exports'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserPayloadSchema } from '@raven/api/exports'
import { Button } from '@raven/web/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@raven/web/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@raven/web/components/ui/table'
import { IconDots } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { CreateUserDialog } from '../components/create-user.dialog'
import { useCreateUser, useDeleteUser } from '../hooks/users.hooks'

type UsersFormProps = {
  data?: PaginatedResult<User>
  isLoading: boolean
  isError: boolean
  error?: Error | null
}

export function UsersForm({ data, isLoading, isError, error }: UsersFormProps) {
  const create = useCreateUser()
  const deleteUser = useDeleteUser()

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserPayloadSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(data, {
      onError: (err) => {
        form.setError('root.serverError', {
          message: err.message,
        })
      },
    })
  })

  if (isLoading)
    return <div>Loading users...</div>

  if (isError)
    return <div>{error?.message ?? 'Error loading users'}</div>

  return (
    <div>
      <CreateUserDialog
        register={form.register}
        errors={form.formState.errors}
        onSubmit={onSubmit}
        isLoading={create.isPending}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-light w-[40px]">{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <IconDots />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => deleteUser.mutate(user.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

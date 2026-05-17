import type { User } from '@raven/api/exports'
import { Button } from '@raven/web/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@raven/web/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@raven/web/components/ui/table'
import { IconDots } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useDeleteUser } from '../hooks/users.hooks'

type UsersRowProps = {
  user: User
}

export function UsersRow({ user }: UsersRowProps) {
  const deleteUser = useDeleteUser()
  const navigate = useNavigate()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate(`/users/${user.id}`)}
    >
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
              onClick={e => e.stopPropagation()}
            >
              <IconDots />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation()
                deleteUser.mutate(user.id)
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

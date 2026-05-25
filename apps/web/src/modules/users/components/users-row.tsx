import type { User } from '@raven/api/exports'
import { Button } from '@raven/web/common/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@raven/web/common/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@raven/web/common/components/ui/table'
import { IconDots } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDeleteUser } from '../hooks/users.hooks'

type UsersRowProps = {
  user: User
}

export function UsersRow({ user }: UsersRowProps) {
  const { t } = useTranslation('ui')

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
              <span className="sr-only">{t('SR_OPEN_MENU')}</span>
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
              {t('USER_DELETE')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

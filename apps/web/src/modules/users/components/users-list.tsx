import type { User } from '@raven/api/exports'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@raven/web/common/components/ui/table'
import { useTranslation } from 'react-i18next'
import { UsersRow } from './users-row'

type UsersListProps = {
  users: User[]
}

export function UsersList({ users }: UsersListProps) {
  const { t } = useTranslation('ui')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>{t('USER_NAME')}</TableHead>
          <TableHead>{t('USER_EMAIL')}</TableHead>
          <TableHead className="text-right">{t('USER_ACTIONS')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <UsersRow
            key={user.id}
            user={user}
          />
        ))}
      </TableBody>
    </Table>
  )
}

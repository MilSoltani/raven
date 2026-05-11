import type { User } from '@raven/api/exports'
import { Button } from '@raven/web/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@raven/web/components/ui/dialog'
import { Field, FieldGroup } from '@raven/web/components/ui/field'
import { Input } from '@raven/web/components/ui/input'
import { Label } from '@raven/web/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@raven/web/components/ui/table'

type UsersFormProps = {
  data?: User[]
  isLoading: boolean
  isError: boolean
  error?: Error | null
}

export function UsersForm({ data, isLoading, isError, error }: UsersFormProps) {
  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError) {
    return <div>{error?.message ?? 'Error loading users'}</div>
  }

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>New user</DialogTitle>
              <DialogDescription>
                Create a new user
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue="Pedro Duarte"
                />
              </Field>
              <Field>
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  name="email"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-light w-[40px]">{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

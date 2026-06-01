import { IconArrowsMaximize, IconX } from '@tabler/icons-react'
import { Button } from '@xenon/web/common/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@xenon/web/common/components/ui/drawer'
import { Link } from 'react-router-dom'

type AppDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  drawerTitle: string
  drawerBody: React.ReactNode
  pageLinkUrl?: string
  drawerDescription: string
  width?: string
  triggerButton: React.ReactNode
}

export function AppDrawer({
  open,
  onOpenChange,
  drawerTitle,
  drawerBody,
  pageLinkUrl,
  drawerDescription,
  width = 'w-[400px]',
  triggerButton,
}: AppDrawerProps) {
  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger asChild>
        {triggerButton}
      </DrawerTrigger>

      <DrawerContent className={`${width} data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]`}>
        <DrawerHeader>
          <div className="flex flex-row items-center justify-between">
            <DrawerTitle>{drawerTitle}</DrawerTitle>

            <div className="flex items-center gap-2">
              {pageLinkUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link
                    to={pageLinkUrl}
                    viewTransition
                  >
                    <IconArrowsMaximize className="w-4 h-4" />
                  </Link>
                </Button>
              )}

              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <IconX className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>

          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>

        <div className="flex h-full flex-col">
          {drawerBody}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

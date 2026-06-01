import { Toaster } from '@xenon/web/common/components/ui/sonner'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './theme-provider'

type LayoutProps = {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
}

export function AppLayout({ header, sidebar, footer }: LayoutProps) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <Toaster />

      <div className="min-h-screen flex flex-col">
        {header && <header>{header}</header>}

        <div className="flex flex-1 gap-10">
          {sidebar && <aside>{sidebar}</aside>}

          <main className="flex-1">
            <Outlet />
          </main>
        </div>

        {footer && <footer>{footer}</footer>}
      </div>
    </ThemeProvider>
  )
}

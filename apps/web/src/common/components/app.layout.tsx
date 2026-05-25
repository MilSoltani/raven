import { Outlet } from 'react-router-dom'

type LayoutProps = {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
}

export function AppLayout({ header, sidebar, footer }: LayoutProps) {
  return (
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
  )
}

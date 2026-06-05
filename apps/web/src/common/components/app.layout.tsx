import { AppSidebar } from '@xenon/web/common/components/app-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@xenon/web/common/components/ui/breadcrumb'
import { Separator } from '@xenon/web/common/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@xenon/web/common/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from './ui/tooltip'

export function AppLayout() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<TooltipProvider>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mb-2">
							<div className="flex items-center gap-2 px-4">
								<SidebarTrigger className="-ml-1" />
								<Separator
									orientation="vertical"
									className="mr-2 data-[orientation=vertical]:h-4"
								/>
								<Breadcrumb>
									<BreadcrumbList>
										<BreadcrumbItem className="hidden md:block">
											<BreadcrumbLink href="#">Tickets</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator className="hidden md:block" />
										<BreadcrumbItem>
											<BreadcrumbPage>All tickets</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
							</div>
						</header>
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							<Outlet />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>
		</ThemeProvider>
	)
}

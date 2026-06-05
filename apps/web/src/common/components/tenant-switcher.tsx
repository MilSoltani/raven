'use client'

import { IconPlus, IconSelector } from '@tabler/icons-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@xenon/web/common/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@xenon/web/common/components/ui/sidebar'
import * as React from 'react'

export function TenantSwitcher({
	tenants,
}: {
	tenants: {
		name: string
		logo: React.ReactNode
		plan: string
	}[]
}) {
	const { isMobile } = useSidebar()
	const [activeTenant, setActiveTenant] = React.useState(tenants[0])

	if (!activeTenant) {
		return null
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-mono text-lg">
								Xe
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{activeTenant.name}
								</span>
								<span className="truncate text-xs">{activeTenant.plan}</span>
							</div>
							<IconSelector className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-fit"
						align="start"
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Tenants
						</DropdownMenuLabel>
						{tenants.map((tenant, index) => (
							<DropdownMenuItem
								key={tenant.name}
								onClick={() => setActiveTenant(tenant)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									{tenant.logo}
								</div>
								{tenant.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<IconPlus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">
								Add tenant
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

import {
	IconBook,
	IconCommand,
	IconLayoutRows,
	IconSettings,
	IconTicket,
	IconUsers,
	IconWaveSine,
} from '@tabler/icons-react'

import { NavMain } from '@xenon/web/common/components/nav-main'
import { NavProjects } from '@xenon/web/common/components/nav-projects'
import { NavUser } from '@xenon/web/common/components/nav-user'
import { TenantSwitcher } from '@xenon/web/common/components/tenant-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@xenon/web/common/components/ui/sidebar'
import type * as React from 'react'

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	tenants: [
		{
			name: 'Acme Inc',
			logo: <IconLayoutRows />,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: <IconWaveSine />,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: <IconCommand />,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Tickets',
			url: '#',
			icon: <IconTicket />,
			isActive: true,
			items: [
				{
					title: 'All tickets',
					url: '/tickets',
				},
			],
		},
		{
			title: 'Users',
			url: '#',
			icon: <IconUsers />,
			items: [
				{
					title: 'All users',
					url: '/users',
				},
			],
		},
		{
			title: 'Knowledgebase',
			url: '#',
			icon: <IconBook />,
			items: [
				{
					title: 'Articles',
					url: '#',
				},
			],
		},
	],
	projects: [
		{
			name: 'Settings',
			url: '#',
			icon: <IconSettings />,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TenantSwitcher tenants={data.tenants} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@xenon/web/common/components/ui/sidebar'

export function NavProjects({
	projects,
}: {
	projects: {
		name: string
		url: string
		icon: React.ReactNode
	}[]
}) {
	return (
		<SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<a href={item.url}>
								{item.icon}
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

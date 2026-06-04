import { IconChevronDown } from '@tabler/icons-react'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface FilterDropdownProps<T extends string> {
	label: string
	options: T[]
	selectedFilters: T[]
	onFilterChange: (filters: T[]) => void
}

export function FilterDropdown<T extends string>({
	label,
	options,
	selectedFilters,
	onFilterChange,
}: FilterDropdownProps<T>) {
	const handleCheckedChange = (item: T, checked: boolean) => {
		if (checked) {
			onFilterChange([...selectedFilters, item])
		} else {
			onFilterChange(selectedFilters.filter((s) => s !== item))
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full">
					<span>{label}</span>
					<IconChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{options.map((option) => (
					<DropdownMenuCheckboxItem
						key={option}
						className="capitalize"
						checked={selectedFilters.includes(option)}
						onCheckedChange={(checked) => handleCheckedChange(option, checked)}
						onSelect={(e) => e.preventDefault()}
					>
						{option}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

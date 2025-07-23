import type { Project } from '@/models'

export interface AppData {
	projects: Project[]

	filters: {
		statuses: string[]
		tags: string[]
		search: string
	}
}

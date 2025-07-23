import type { Task } from '@/models'

export interface Project {
	id: string // UUID
	name: string
	tasks: Task[]
}

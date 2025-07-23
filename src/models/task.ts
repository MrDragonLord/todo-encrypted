export interface Task {
	id: string // UUID
	title: string
	status: TaskStatus
	tags: string[]
	subtasks: Task[]
	createdAt: Date
	updatedAt: Date
}

export type TaskStatus = 'todo' | 'in-progress' | 'done'

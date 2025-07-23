import { reactive, ref } from 'vue'
import type { Task } from '@/models'

export function useTaskEditor(initialTask: Task, maxDepth = 1) {
	const isEditing = ref(false)
	const newTag = ref('')
	const newSubtaskTitle = ref('')

	const cloneTask = (task: Task): Task => ({
		...task,
		tags: [...task.tags],
		subtasks: task.subtasks.map(cloneTask),
		createdAt: new Date(task.createdAt),
		updatedAt: new Date(task.updatedAt)
	})

	const localTask = reactive(cloneTask(initialTask))
	const originalTask = ref(cloneTask(initialTask))

	const startEdit = () => {
		isEditing.value = true
		originalTask.value = cloneTask(localTask)
	}

	const cancelEdit = () => {
		Object.assign(localTask, cloneTask(originalTask.value))
		isEditing.value = false
	}

	const saveEdit = () => {
		isEditing.value = false
		return cloneTask(localTask)
	}

	const addTag = () => {
		if (newTag.value.trim()) {
			localTask.tags.push(newTag.value.trim())
			newTag.value = ''
		}
	}

	const removeTag = (index: number) => {
		localTask.tags.splice(index, 1)
	}

	const addSubtask = () => {
		const title = newSubtaskTitle.value.trim()
		if (!title) return
		const now = new Date()
		localTask.subtasks.push({
			id: crypto.randomUUID(),
			title,
			status: 'todo',
			tags: [],
			subtasks: [],
			createdAt: now,
			updatedAt: now
		})
		newSubtaskTitle.value = ''
	}

	const updateSubtask = (updated: Task) => {
		const idx = localTask.subtasks.findIndex(t => t.id === updated.id)
		if (idx !== -1) localTask.subtasks[idx] = updated
	}

	const deleteSubtask = (id: string) => {
		localTask.subtasks = localTask.subtasks.filter(t => t.id !== id)
	}

	return {
		localTask,
		isEditing,
		newTag,
		newSubtaskTitle,
		startEdit,
		cancelEdit,
		saveEdit,
		addTag,
		removeTag,
		addSubtask,
		updateSubtask,
		deleteSubtask
	}
}

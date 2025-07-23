import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@/composables/useStorage'
import type { Task } from '@/models'

export function useProjectTasks() {
	const { data, filters } = useLocalStorage()
	const route = useRoute()

	const projectId = computed(() => route.params.projectId as string)

	const project = computed(() =>
		data.value.projects.find(p => p.id === projectId.value)
	)

	const filteredTasks = computed(() => {
		const currentTasks = project.value?.tasks ?? []

		const noStatus = filters.value.statuses.length === 0
		const noTags = filters.value.tags.length === 0
		const noSearch = !filters.value.search.trim()

		const matchesFilters = (task: Task): boolean => {
			const matchesStatus = noStatus || filters.value.statuses.includes(task.status)
			const matchesTags = noTags || task.tags.some(tag => filters.value.tags.includes(tag))
			const matchesSearch = noSearch || task.title.toLowerCase().includes(filters.value.search.toLowerCase())
			return matchesStatus && matchesTags && matchesSearch
		}

		const hasMatchingSubtask = (task: Task): boolean => {
			return task.subtasks.some(sub => matchesFilters(sub) || hasMatchingSubtask(sub))
		}

		return currentTasks.filter(task => matchesFilters(task) || hasMatchingSubtask(task))
	})

	const onTaskUpdate = (taskId: string, updated: Task) => {
		const idx = project.value?.tasks.findIndex(t => t.id === taskId)
		if (idx !== undefined && idx !== -1 && project.value) {
			project.value.tasks[idx] = updated
		}
	}

	const onTaskDelete = (taskId: string) => {
		if (project.value) {
			project.value.tasks = project.value.tasks.filter(t => t.id !== taskId)
		}
	}

	return {
		projectId,
		project,
		filteredTasks,
		onTaskUpdate,
		onTaskDelete
	}
}

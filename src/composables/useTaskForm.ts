import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from '@/composables/useStorage.ts'
import type { TaskStatus } from '@/models'

export interface TaskForm {
	data: {
		name: string
		status: TaskStatus
		tags: string[]
	}
	tag: string
}

export function useTaskForm() {
	const { data } = useLocalStorage()
	const route = useRoute()
	const projectId = computed(() => route.params.projectId as string)

	const form = reactive<TaskForm>({
		data: {
			name: '',
			status: 'in-progress',
			tags: []
		},
		tag: ''
	})

	const addTag = () => {
		if (!form.tag.trim()) return
		form.data.tags.push(form.tag.trim())
		form.tag = ''
	}

	const removeTag = (index: number) => {
		form.data.tags.splice(index, 1)
	}

	const addTask = () => {
		const project = data.value.projects.find(p => p.id === projectId.value)
		if (!project) {
			console.warn('Проект не найден')
			return
		}

		const now = new Date()

		project.tasks.push({
			id: crypto.randomUUID(),
			title: form.data.name,
			status: form.data.status,
			tags: [...form.data.tags],
			subtasks: [],
			createdAt: now,
			updatedAt: now
		})

		// Очистка формы
		form.data.name = ''
		form.data.status = 'in-progress'
		form.data.tags = []
		form.tag = ''
	}

	return {
		form,
		addTag,
		removeTag,
		addTask
	}
}

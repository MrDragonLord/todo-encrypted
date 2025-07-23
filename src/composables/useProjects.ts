import { computed, ref } from 'vue'
import { useLocalStorage } from '@/composables/useStorage'
import { useRouter } from 'vue-router'

export function useProjects() {
	const { data } = useLocalStorage()
	const router = useRouter()

	const projects = computed(() => data.value.projects)
	const editingId = ref<string | null>(null)
	const newName = ref('')

	const createProject = () => {
		data.value.projects.push({
			id: crypto.randomUUID(),
			name: `Проект ${data.value.projects.length + 1}`,
			tasks: []
		})
	}

	const startEdit = (id: string, currentName: string) => {
		editingId.value = id
		newName.value = currentName
	}

	const saveEdit = (id: string) => {
		const project = data.value.projects.find(p => p.id === id)
		if (project) {
			project.name = newName.value.trim()
		}
		editingId.value = null
	}

	const deleteProject = (id: string) => {
		data.value.projects = data.value.projects.filter(p => p.id !== id)
	}

	const openProject = (id: string) => {
		if (editingId.value) return

		router.push({
			name: 'project.view',
			params: { projectId: id }
		})
	}

	return {
		projects,
		editingId,
		newName,
		createProject,
		startEdit,
		saveEdit,
		deleteProject,
		openProject
	}
}

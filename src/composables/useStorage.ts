import { computed, ref, watch } from 'vue'
import type { AppData } from '@/models'

const STORAGE_KEY = 'todo_app_data'

const data = ref<AppData>({
	projects: [],
	filters: {
		statuses: [],
		tags: [],
		search: ''
	}
})

let isInitialized = false

export function useLocalStorage() {
	if (!isInitialized) {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (raw) {
			try {
				data.value = JSON.parse(raw)
			} catch {
				console.warn('Invalid localStorage format')
			}
		}

		watch(
			data,
			() => {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
			},
			{ deep: true }
		)

		isInitialized = true
	}

	const filters = computed({
		get: () => data.value.filters,
		set: (newFilters) => {
			data.value.filters = newFilters
		}
	})

	return {
		data,
		filters
	}
}

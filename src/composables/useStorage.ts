import { ref } from 'vue'
import type { AppData } from '@/models'

const STORAGE_KEY = 'todo_app_data'

export function useLocalStorage() {
	const data = ref<AppData>()

	const saveData = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
	}

	return {
		data,
		saveData
	}
}

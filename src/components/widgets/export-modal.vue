<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useLocalStorage } from '@/composables/useStorage'
import { ref } from 'vue'
import { encryptAES } from '@/crypto/encryption'
import type { Project } from '@/models'

const model = defineModel<boolean>({ default: false })
const password = ref('')
const { data } = useLocalStorage()

const downloadEncryptedToken = () => {
	if (!password.value.trim()) {
		alert('Введите пароль для шифрования')
		return
	}

	const exportData: { projects: Project[] } = {
		projects: data.value.projects.map(p => ({
			id: p.id,
			name: p.name,
			tasks: p.tasks
		}))
	}

	const encrypted = encryptAES(exportData, password.value)
	const blob = new Blob([encrypted])
	const url = URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.href = url
	a.download = 'todo-token.txt'
	a.click()
	URL.revokeObjectURL(url)
	password.value = ''
	model.value = false
}
</script>

<template>
	<Modal v-model="model">
		<h2 class="text-lg font-semibold mb-4">Экспорт задач</h2>

		<div class="space-y-3">
			<Input
				v-model="password"
				name="exportKey"
				type="password"
				placeholder="Ключ для шифрования"
				label="Пароль (AES)"
			/>
		</div>

		<template #footer>
			<div class="flex justify-end gap-3">
				<Button variant="outline" @click="model = false">Отмена</Button>
				<Button variant="primary" @click="downloadEncryptedToken">Скачать токен</Button>
			</div>
		</template>
	</Modal>
</template>

<script setup lang="ts">
import { Input as InputText } from '@/components/ui/input'
import { InputFile } from '@/components/ui/input-file'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useStorage'
import { decryptAES } from '@/crypto/encryption'
import type { AppData } from '@/models'

const model = defineModel<boolean>({ default: false })

const password = ref('')
const fileContent = ref<string | null>(null)
const { data } = useLocalStorage()

const handleFile = (e: Event) => {
	const input = e.target as HTMLInputElement
	const file = input.files?.[0]
	if (!file) return

	const reader = new FileReader()
	reader.onload = () => {
		fileContent.value = reader.result as string
	}
	reader.readAsText(file)
}

const importData = () => {
	if (!password.value.trim() || !fileContent.value) {
		alert('Введите пароль и выберите файл')
		return
	}

	try {
		const result = decryptAES<AppData>(fileContent.value, password.value)
		data.value.projects = result.projects
		alert('Импорт завершён успешно!')
		password.value = ''
		model.value = false
	} catch {
		alert('Ошибка расшифровки: неверный ключ или повреждённый файл')
	}
}
</script>

<template>
	<Modal v-model="model">
		<h2 class="text-lg font-semibold mb-4">Импорт задач</h2>

		<div class="space-y-3">
			<InputText
				v-model="password"
				name="importKey"
				type="password"
				placeholder="Ключ для расшифровки"
				label="Пароль (AES)"
			/>
			<InputFile
				class="w-full text-sm text-gray-700"
				accept=".txt"
				@change="handleFile"
			/>
		</div>

		<template #footer>
			<div class="flex justify-end gap-3">
				<Button variant="outline" @click="model = false">Отмена</Button>
				<Button variant="primary" @click="importData">Импортировать</Button>
			</div>
		</template>
	</Modal>
</template>

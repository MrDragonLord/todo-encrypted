<script setup lang="ts">
import { Input as InputText } from '@/components/ui/input'
import { InputFile } from '@/components/ui/input-file'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

const model = defineModel<boolean>({ default: false })
</script>

<template>
	<Modal v-model="model">
		<h2 class="text-lg font-semibold mb-4">Импорт задач</h2>

		<div class="space-y-3">
			<InputText
				name="importKey"
				type="password"
				placeholder="Ключ для расшифровки"
				label="Пароль (AES)"
			/>
			<InputFile class="w-full text-sm text-gray-700" />
		</div>

		<template #footer>
			<div class="flex justify-end gap-3">
				<Button variant="outline" @click="model = false">Отмена</Button>
				<Button variant="primary">Импортировать</Button>
			</div>
		</template>
	</Modal>
</template>

<style scoped></style>

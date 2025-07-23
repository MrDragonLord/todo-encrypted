<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

const model = defineModel<boolean>({ default: false })
</script>

<template>
	<Modal v-model="model">
		<h2 class="text-lg font-semibold mb-4">Экспорт задач</h2>

		<div class="space-y-3">
			<Input
				name="exportKey"
				type="password"
				placeholder="Ключ для шифрования"
				label="Пароль (AES)"
			/>
		</div>

		<template #footer>
			<div class="flex justify-end gap-3">
				<Button variant="outline" @click="model = false">Отмена</Button>
				<Button variant="primary">Скачать токен</Button>
			</div>
		</template>
	</Modal>
</template>

<style scoped></style>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { Select } from '@/components/ui/select'
</script>

<template>
	<form class="space-y-4" @submit.prevent>
		<!-- Заголовок -->
		<div>
			<Input name="title" placeholder="Название задачи" label="Задача" required />
		</div>

		<!-- Статус -->
		<div>
			<Select
				name="status"
				:options="[
					{ label: 'В работе', value: 'in-progress' },
					{ label: 'ToDo', value: 'todo' },
					{ label: 'Готово', value: 'done' }
				]"
				placeholder="Выберите статус..."
				size="md"
				label="Статус"
			/>
		</div>

		<!-- Теги -->
		<div>
			<Input name="tags" placeholder="Добавить тег и нажать Enter" label="Теги" />

			<div class="flex flex-wrap gap-2 mt-2">
				<Tag label="Test 1" size="md" removable />
				<Tag label="Test 1" size="md" removable />
			</div>
		</div>

		<!-- Кнопка -->
		<div>
			<Button type="submit" variant="primary"> Добавить задачу </Button>
		</div>
	</form>
</template>

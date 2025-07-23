<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { Select } from '@/components/ui/select'
import { useTaskForm } from '@/composables/useTaskForm'

const { form, addTag, removeTag, addTask } = useTaskForm()
</script>

<template>
	<form class="space-y-4" @submit.prevent>
		<!-- Заголовок -->
		<div>
			<Input
				v-model="form.data.name"
				name="title"
				placeholder="Название задачи"
				label="Задача"
				required
			/>
		</div>

		<!-- Статус -->
		<div>
			<Select
				v-model="form.data.status"
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
			<Input
				v-model="form.tag"
				name="tags"
				placeholder="Добавить тег и нажать Enter"
				label="Теги"
				@keydown.enter.prevent="addTag"
			/>

			<div class="flex flex-wrap gap-2 mt-2">
				<Tag
					v-for="(tag, index) in form.data.tags"
					:key="index"
					:label="tag"
					size="md"
					removable
					@remove="removeTag(index)"
				/>
			</div>
		</div>

		<!-- Кнопка -->
		<div>
			<Button @click.prevent="addTask" type="submit" variant="primary">
				Добавить задачу
			</Button>
		</div>
	</form>
</template>

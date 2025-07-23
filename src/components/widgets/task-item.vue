<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Tag } from '@/components/ui/tag'
import { Select } from '@/components/ui/select'
import { ButtonInline } from '@/components/ui/button-inline'

defineProps<{
	depth: number
}>()

const maxDepth = 1
</script>
<template>
	<div
		class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all"
		:style="{ marginLeft: `${depth * 1.25}rem` }"
	>
		<!-- Верхняя строка -->
		<div class="flex justify-between items-center mb-2">
			<div class="text-sm text-gray-600 font-medium flex items-center gap-2">
				<Select
					name="status"
					:options="[
						{ label: 'В работе', value: 'in-progress' },
						{ label: 'ToDo', value: 'todo' },
						{ label: 'Готово', value: 'done' }
					]"
					placeholder="Выберите..."
					size="sm"
				/>
			</div>

			<div class="flex gap-2">
				<ButtonInline variant="primary">Редактировать</ButtonInline>
				<ButtonInline variant="danger">Удалить</ButtonInline>
			</div>
		</div>

		<!-- Название задачи -->
		<div class="mb-2">
			<Input
				type="text"
				placeholder="Заголовок задачи"
				name="title"
				class="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
				:readonly="true"
			/>
		</div>

		<!-- Теги -->
		<div class="mb-2">
			<div class="flex flex-wrap gap-1 mb-1">
				<Tag label="Test 1" size="sm" removable />
				<Tag label="Test 1" size="sm" removable />
			</div>
			<Input
				type="text"
				placeholder="Добавить тег..."
				name="tag"
				class="text-sm border border-gray-300 px-2 py-1 rounded-md w-full"
				:readonly="true"
			/>
		</div>

		<div class="mt-4" v-if="depth !== maxDepth">
			<ButtonInline variant="primary" class="mb-2">+ Подзадача</ButtonInline>
			<Input
				type="text"
				class="w-full border border-dashed border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 bg-gray-50"
				placeholder="Введите подзадачу…"
				name="depthTask"
				readonly
			/>
		</div>

		<!-- Подзадачи -->
		<div v-if="depth < maxDepth" class="mt-4 space-y-2">
			<TaskItem :depth="depth + 1" />
		</div>
	</div>
</template>

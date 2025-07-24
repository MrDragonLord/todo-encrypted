<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Tag } from '@/components/ui/tag'
import { Select } from '@/components/ui/select'
import { ButtonInline } from '@/components/ui/button-inline'
import type { Task } from '@/models'
import { useTaskEditor } from '@/composables/useTaskEditor.ts'

const {
	depth,
	task
} = defineProps<{
	depth: number
	task: Task
}>()

const emit = defineEmits<{
	(e: 'update', updatedTask: Task): void
	(e: 'delete'): void
}>()

const maxDepth = 1

const {
	localTask,
	isEditing,
	newTag,
	newSubtaskTitle,
	startEdit,
	cancelEdit,
	saveEdit,
	addTag,
	removeTag,
	addSubtask,
	updateSubtask,
	deleteSubtask
} = useTaskEditor(task)

</script>

<template>
	<div
		class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all"
		:style="{ marginLeft: `${depth * 1.25}rem` }"
	>
		<!-- Верх -->
		<div class="flex justify-between items-center mb-2">
			<div class="text-sm text-gray-600 font-medium flex items-center gap-2">
				<Select
					v-model="localTask.status"
					name="status"
					:options="[
						{ label: 'В работе', value: 'in-progress' },
						{ label: 'ToDo', value: 'todo' },
						{ label: 'Готово', value: 'done' }
					]"
					placeholder="Выберите..."
					size="sm"
					:disabled="!isEditing"
				/>
			</div>

			<div class="flex gap-2">
				<template v-if="isEditing">
					<ButtonInline variant="primary" @click="saveEdit">Сохранить</ButtonInline>
					<ButtonInline variant="default" @click="cancelEdit">Отмена</ButtonInline>
				</template>
				<template v-else>
					<ButtonInline variant="primary" @click="startEdit">Редактировать</ButtonInline>
					<ButtonInline variant="danger" @click="emit('delete')">Удалить</ButtonInline>
				</template>
			</div>
		</div>

		<!-- Название -->
		<div class="mb-2">
			<Input
				v-model="localTask.title"
				placeholder="Заголовок задачи"
				:name="`title-${localTask.id}`"
				class="w-full"
				:readonly="!isEditing"
			/>
		</div>

		<!-- Теги -->
		<div class="mb-2">
			<div class="flex flex-wrap gap-1 mb-1">
				<Tag
					v-for="(tag, index) in localTask.tags"
					:key="index"
					:label="tag"
					size="md"
					:removable="isEditing"
					@remove="removeTag(index)"
				/>
			</div>
			<Input
				v-model="newTag"
				placeholder="Добавить тег..."
				name="tag"
				class="text-sm w-full"
				v-if="isEditing"
				@keydown.enter.prevent="addTag"
			/>
		</div>

		<div v-if="isEditing && depth !== maxDepth" class="mt-4">
			<Input
				v-model="newSubtaskTitle"
				placeholder="Введите подзадачу…"
				class="w-full border border-dashed border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
				name="depthTask"
				@keydown.enter.prevent="addSubtask"
			/>
		</div>

		<!-- Подзадачи -->
		<div class="mt-4 space-y-2" v-if="depth < maxDepth">
			<TaskItem
				v-for="subTask in localTask.subtasks"
				:key="subTask.id"
				:depth="depth + 1"
				:task="subTask"
				@update="updateSubtask"
				@delete="deleteSubtask(subTask.id)"
			/>
		</div>
	</div>
</template>

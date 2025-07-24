<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/composables/useStorage'
import { computed } from 'vue'
import type { Task } from '@/models'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data } = useLocalStorage()

const filters = computed(() => data.value.filters)

const currentProject = computed(() => {
	const id = route.params.projectId as string
	return data.value.projects.find(p => p.id === id)
})

const statusesList = [
	{ label: 'ToDo', value: 'todo' },
	{ label: 'В работе', value: 'in-progress' },
	{ label: 'Готово', value: 'done' }
]

function collectTags(task: Task, tagSet: Set<string>) {
	task.tags.forEach(tag => tagSet.add(tag))
	task.subtasks.forEach(sub => collectTags(sub, tagSet))
}

const allTags = computed(() => {
	const tags = new Set<string>()
	currentProject.value?.tasks.forEach(t => collectTags(t, tags))
	return Array.from(tags)
})
</script>

<template>
	<form class="space-y-6" @submit.prevent>
		<!-- Статусы -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">Статусы задач</label>
			<div class="flex flex-wrap gap-3">
				<Checkbox
					v-for="status in statusesList"
					:key="status.value"
					:label="status.label"
					:value="status.value"
					v-model="filters.statuses"
				/>
			</div>
		</div>

		<!-- Теги -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">Теги</label>
			<div class="flex flex-wrap gap-3">
				<Checkbox
					v-for="tag in allTags"
					:key="tag"
					:label="tag"
					:value="tag"
					v-model="filters.tags"
				/>
			</div>
		</div>

		<!-- Сброс -->
		<div>
			<Button
				type="button"
				variant="outline"
				@click="Object.assign(filters, { statuses: [], tags: [], search: '' })"
			>
				Сбросить фильтры
			</Button>
		</div>
	</form>
</template>

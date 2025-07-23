<script setup lang="ts">
import { Card } from '@/components/ui/card'
import FilterPanel from '@/components/widgets/filter-panel.vue'
import TaskForm from '@/components/widgets/task-form.vue'
import TaskItem from '@/components/widgets/task-item.vue'
import { useLocalStorage } from '@/composables/useStorage.ts'
import { computed } from 'vue'

const { data } = useLocalStorage()
const projects = computed(() => data.value.projects)
</script>

<template>
	<section class="space-y-6">
		<!-- Панель фильтров -->
		<Card>
			<h2 class="text-lg font-semibold text-gray-800 mb-3">Фильтры</h2>
			<FilterPanel />
		</Card>

		<!-- Форма добавления задачи -->
		<Card>
			<h2 class="text-lg font-semibold text-gray-800 mb-3">Новая задача</h2>
			<TaskForm />
		</Card>

		<!-- Список задач -->
		<div class="space-y-4">
			<TaskItem :depth="0" />
			<TaskItem :depth="0" />
			<TaskItem :depth="0" />

			<p class="text-center text-gray-500 text-sm mt-4">
				Задачи не найдены по текущим фильтрам.
			</p>
		</div>
	</section>
</template>

<style scoped></style>

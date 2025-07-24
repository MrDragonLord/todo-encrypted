<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ButtonInline } from '@/components/ui/button-inline'

import FilterPanel from '@/components/widgets/filter-panel.vue'
import TaskForm from '@/components/widgets/task-form.vue'
import TaskItem from '@/components/widgets/task-item.vue'

import { useProjectTasks } from '@/composables/useProjectTasks'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
	project,
	filteredTasks,
	onTaskUpdate,
	onTaskDelete
} = useProjectTasks()
</script>

<template>
	<section class="space-y-6">
		<!-- Название проекта -->
		<h1 class="text-3xl font-bold text-gray-900">
			{{ project?.name || 'Проект не найден' }}
		</h1>

		<!-- Если проекта нет -->
		<div v-if="!project" class="text-red-600">
			Проект с таким ID не найден. <br />
			<ButtonInline @click="router.push({ name: 'home' })" variant="primary">
				Вернуться назад
			</ButtonInline>
		</div>

		<!-- Если проект найден -->
		<template v-else>
			<!-- Контейнер с колонками -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Левая колонка: фильтры и форма -->
				<div class="space-y-6 lg:col-span-1">
					<Card>
						<h2 class="text-lg font-semibold text-gray-800 mb-3">Фильтры</h2>
						<FilterPanel />
					</Card>

					<Card>
						<h2 class="text-lg font-semibold text-gray-800 mb-3">Новая задача</h2>
						<TaskForm :projectId="project.id" />
					</Card>
				</div>

				<!-- Правая колонка: задачи -->
				<div class="lg:col-span-2 space-y-4">
					<div v-if="filteredTasks.length" class="space-y-4">
						<TaskItem
							v-for="task in filteredTasks"
							:key="task.id"
							:task="task"
							:depth="0"
							@update="onTaskUpdate(task.id, $event)"
							@delete="onTaskDelete(task.id)"
						/>
					</div>
					<p v-else class="text-center text-gray-500 text-sm mt-4">
						Задачи не найдены по текущим фильтрам.
					</p>
				</div>
			</div>
		</template>
	</section>
</template>


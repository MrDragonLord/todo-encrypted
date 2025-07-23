<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ButtonInline } from '@/components/ui/button-inline'
import { Input } from '@/components/ui/input'
import { useProjects } from '@/composables/useProjects'

const {
	projects,
	editingId,
	newName,
	createProject,
	startEdit,
	saveEdit,
	deleteProject,
	openProject
} = useProjects()
</script>

<template>
	<section class="space-y-6">
		<h1 class="text-4xl">Все проекты</h1>

		<ButtonInline @click="createProject" class="text-sm">+ Новый проект</ButtonInline>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card
				v-for="project in projects"
				:key="project.id"
				class="p-4 flex flex-col gap-2 justify-between"
				@click="openProject(project.id)"
			>
				<!-- Название проекта -->
				<template v-if="editingId === project.id">
					<Input v-model="newName" :name="`title-${project.id}`" class="text-sm" />
					<div class="flex gap-2">
						<ButtonInline @click.stop="saveEdit(project.id)">Сохранить</ButtonInline>
						<ButtonInline variant="danger" @click.stop="editingId = null"
							>Отмена</ButtonInline
						>
					</div>
				</template>
				<template v-else>
					<h2
						class="text-lg font-semibold text-center cursor-pointer"
						@click="router.push('/')"
					>
						{{ project.name }}
					</h2>
					<div class="flex justify-center gap-2">
						<ButtonInline @click.stop="startEdit(project.id, project.name)"
							>Редактировать</ButtonInline
						>
						<ButtonInline variant="danger" @click.stop="deleteProject(project.id)"
							>Удалить</ButtonInline
						>
					</div>
				</template>
			</Card>
		</div>
	</section>
</template>

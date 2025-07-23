<script setup lang="ts">
import { ref } from 'vue'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import ExportModal from '@/components/widgets/export-modal.vue'
import ImportModal from '@/components/widgets/import-modal.vue'
import { useLocalStorage } from '@/composables/useStorage.ts'

const { data } = useLocalStorage()
const filters = data.value.filters

const showExportModal = ref(false)
const showImportModal = ref(false)
</script>

<template>
	<nav class="bg-gray-800 text-white">
		<div
			class="container mx-auto py-3 flex lg:flex-row flex-col gap-5 items-center justify-between"
		>
			<RouterLink :to="{ name: 'home' }">
				<Logo />
			</RouterLink>

			<div class="flex items-center lg:flex-row flex-col gap-2">
				<Input
					name="search"
					placeholder="Поиск"
					v-model="filters.search"
					class="bg-white text-black"
				/>
				<Button name="import" @click="showImportModal = true">Импорт</Button>
				<Button name="export" variant="outline" @click="showExportModal = true">
					Экспорт
				</Button>
			</div>
		</div>
	</nav>
	<ExportModal v-model="showExportModal" />
	<ImportModal v-model="showImportModal" />
</template>

<style scoped></style>

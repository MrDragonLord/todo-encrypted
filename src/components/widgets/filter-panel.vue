<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'

const check = ref(false)
</script>

<template>
	<form class="space-y-6" @submit.prevent>
		<!-- Статусы -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">Статусы задач</label>
			<div class="flex flex-wrap gap-3">
				<Checkbox
					v-model="check"
					name="status-inprogress"
					id="status-inprogress"
					label="В работе"
				/>
			</div>
		</div>

		<!-- Теги -->
		<label class="block text-sm font-medium text-gray-700 mb-1">Теги</label>
		<div class="flex flex-wrap gap-3">
			<Checkbox
				v-for="n in 3"
				:key="n"
				:name="`tag-${n}`"
				:id="`tag-${n}`"
				:label="`Test ${n}`"
			/>
		</div>

		<!-- Сброс -->
		<div>
			<Button type="button" variant="outline" className="text-sm"> Сбросить фильтры </Button>
		</div>
	</form>
</template>

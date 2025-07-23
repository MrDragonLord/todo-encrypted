<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

interface Option {
	label: string
	value: string | number
}
interface Props {
	label?: string
	name: string
	options: Option[]
	placeholder?: string
	disabled?: boolean
	size?: 'sm' | 'md'
}

const { label, name, options, placeholder, disabled, size = 'md' } = defineProps<Props>()
const model = defineModel<string | number>({ default: '' })

const sizeClasses = computed(() =>
	size === 'sm' ? 'text-sm px-2 py-1 pr-8' : 'text-sm px-3 py-2 pr-8'
)
</script>

<template>
	<div class="flex flex-col gap-2 relative">
		<label v-if="label" :for="name" class="text-sm font-medium text-gray-700">
			{{ label }}
		</label>

		<div class="relative">
			<!-- Кастомная стрелка -->
			<svg
				class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"
				/>
			</svg>

			<select
				:id="name"
				:name="name"
				v-model="model"
				:disabled="disabled"
				v-bind="$attrs"
				:class="
					cn(
						'block w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed appearance-none',
						sizeClasses
					)
				"
			>
				<option v-if="placeholder" disabled value="" hidden>
					{{ placeholder }}
				</option>
				<option v-for="option in options" :key="option.value" :value="option.value">
					{{ option.label }}
				</option>
			</select>
		</div>
	</div>
</template>

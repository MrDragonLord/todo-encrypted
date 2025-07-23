<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn.ts'

const props = defineProps<{
	label?: string
	removable?: boolean
	size?: 'sm' | 'md'
}>()

const emit = defineEmits<{ (e: 'remove'): void }>()

const sizeClass = computed(() =>
	props.size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2 py-0.5'
)
</script>

<template>
	<span
		:class="
			cn('inline-flex items-center bg-gray-200 text-gray-800 rounded select-none', sizeClass)
		"
	>
		<slot>{{ label }}</slot>

		<button
			v-if="removable"
			type="button"
			@click="emit('remove')"
			class="ml-1 text-red-600 hover:text-red-800 leading-none text-sm"
		>
			×
		</button>
	</span>
</template>

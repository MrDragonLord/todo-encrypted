<script setup lang="ts">
import { cn } from '@/utils/cn.ts'

type Variant = 'primary' | 'danger' | 'default'

interface Props {
	variant?: Variant
	size?: 'sm' | 'md'
}

const { variant = 'primary', size = 'sm' } = defineProps<Props>()

const variantClass: Record<Variant, string> = {
	primary: 'text-blue-600 hover:underline hover:text-blue-800',
	danger: 'text-red-600 hover:underline hover:text-red-800',
	default: 'text-gray-600 hover:underline hover:text-gray-800'
}
const sizeClass = {
	sm: 'text-sm',
	md: 'text-base'
}
</script>

<template>
	<button type="button" :class="cn('cursor-pointer', variantClass[variant], sizeClass[size])">
		<slot />
	</button>
</template>

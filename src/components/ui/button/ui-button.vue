<script setup lang="ts">
import { useButton } from './useButton'
import type { Component } from 'vue'

interface Props {
	isBusy?: boolean
	ariaLabel?: string
	icon?: Component
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	variant?: 'outline' | 'primary' | 'danger'
	className?: string
	asChild?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const { childVNode, commonProps, attrs } = useButton(props, e => emit('click', e))
</script>

<template>
	<template v-if="childVNode">
		<component :is="childVNode" />
	</template>
	<template v-else>
		<button v-bind="{ ...commonProps, ...attrs }" class="cursor-pointer">
			<span v-if="isBusy" class="absolute inset-0 flex items-center justify-center">
				<span
					class="w-4 h-4 border-2 border-white border-l-transparent border-t-transparent rounded-full animate-spin"
				/>
			</span>
			<span v-if="icon" class="inline-flex items-center">
				<component :is="icon" class="w-5 h-5" />
			</span>

			<span>
				<slot />
			</span>
		</button>
	</template>
</template>

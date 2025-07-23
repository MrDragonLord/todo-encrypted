<script setup lang="ts">
defineOptions({ inheritAttrs: false })

interface Props {
	name?: string
	accept?: string
	multiple?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
	(e: 'change', event: Event): void
}>()

const onChange = (e: Event) => emit('change', e)
</script>

<template>
	<div class="w-full relative">
		<input
			type="file"
			@change="onChange"
			:name="name"
			:accept="accept"
			:multiple="multiple"
			v-bind="$attrs"
			class="file:mr-5 file:border-0 file:px-6 file:py-2 file:rounded-md file:bg-blue-500 file:text-white file:font-medium file:shadow-sm file:cursor-pointer hover:file:bg-blue-600 hover:file:shadow-md transition border border-gray-300 rounded-lg p-2 bg-white"
		/>
	</div>
</template>

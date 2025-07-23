<script setup lang="ts">
defineOptions({ inheritAttrs: false })

interface Props {
	id?: string
	label?: string
	name?: string
	disabled?: boolean
	value?: string | number | boolean
}

const { id, name, disabled } = defineProps<Props>()

const model = defineModel<boolean | string | number>({
	default: false
})
</script>

<template>
	<div class="inline-flex items-center" :class="{ 'opacity-60 cursor-not-allowed': disabled }">
		<label class="flex items-center relative cursor-pointer">
			<input
				type="checkbox"
				v-model="model"
				:id="id"
				:name="name"
				:disabled="disabled"
				v-bind="$attrs"
				class="peer cursor-pointer h-5 w-5 transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:ring-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none"
			/>
			<span
				class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 20 20"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="1"
				>
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					></path>
				</svg>
			</span>
		</label>
		<label v-if="label" :for="id" class="cursor-pointer ms-2 text-sm font-medium text-gray-800">
			{{ label }}
		</label>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
	label?: string
	name: string
	type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local'
	placeholder?: string
}

const { label, name, placeholder, type } = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })

const showPassword = ref(false)
const inputType = computed(() =>
	type === 'password' ? (showPassword.value ? 'text' : 'password') : type
)

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}
</script>
<template>
	<div class="flex flex-col gap-[5px]">
		<slot name="label">
			<label v-if="label" :for="name" class="text-gray-800 text-sm font-medium">
				{{ label }}
			</label>
		</slot>

		<div class="relative flex items-center">
			<input
				:id="name"
				:name="name"
				:type="inputType"
				:placeholder="placeholder"
				v-bind="$attrs"
				v-model="model"
				class="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-200 rounded-md outline-none transition duration-200 focus:ring-4 focus:ring-blue-300 disabled:opacity-40 disabled:cursor-not-allowed"
			/>
			<button
				v-if="type === 'password'"
				type="button"
				class="absolute right-2 text-lg bg-transparent border-none cursor-pointer"
				@click="togglePasswordVisibility"
			>
				{{ showPassword ? '👁️' : '🙈' }}
			</button>
		</div>

		<div v-if="$slots.hint" class="mt-1 text-sm text-gray-600">
			<slot name="hint" />
		</div>
	</div>
</template>

<style scoped></style>

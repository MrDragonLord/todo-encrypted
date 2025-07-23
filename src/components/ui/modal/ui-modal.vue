<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const model = defineModel({ default: false })

const isVisible = ref(false)
const modalRef = ref<HTMLDivElement | null>(null)

watch(
	() => model.value,
	async value => {
		if (value) {
			isVisible.value = true
			await nextTick()
			document.body.classList.add('overflow-hidden')
		} else {
			isVisible.value = false
			document.body.classList.remove('overflow-hidden')
		}
	}
)

function close() {
	model.value = false
}

function onKeyDown(e: KeyboardEvent) {
	if (e.key === 'Escape') close()
}

onMounted(() => {
	window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
	window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
	<Teleport to="body">
		<transition name="fade" appear>
			<div
				v-if="modelValue"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
				@click.self="close"
			>
				<transition name="scale" appear>
					<div
						ref="modalRef"
						class="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
						role="dialog"
						aria-modal="true"
					>
						<!-- Слот контента -->
						<div class="mb-4">
							<slot />
						</div>

						<!-- Нижний слот -->
						<div v-if="$slots.footer" class="pt-4 border-t border-gray-200">
							<slot name="footer" />
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
	transition: transform 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
	transform: scale(0.95);
}
</style>

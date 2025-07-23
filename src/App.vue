<script setup lang="ts">
import NavBar from '@/components/widgets/nav-bar.vue'
</script>

<template>
	<div>
		<NavBar />
		<main class="container mx-auto my-6">
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>

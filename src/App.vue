<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import NavBar from '@/components/widgets/nav-bar.vue'

const Home = defineAsyncComponent(() => import('@/views/HomeView.vue'))
</script>

<template>
	<div>
		<NavBar />

		<Home class="container mx-auto mt-4" />
	</div>
</template>

<style scoped></style>

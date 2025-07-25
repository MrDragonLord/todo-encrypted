import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/project/:projectId',
			name: 'project.view',
			component: () => import('@/views/ProjectView.vue')
		}
	]
})

export default router

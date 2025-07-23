import {
	computed,
	useSlots,
	useAttrs,
	cloneVNode,
	getCurrentInstance,
	type VNode,
	type Component
} from 'vue'
import { cn } from '@/utils/cn'

type ComponentWithScopeId = Component & { __scopeId?: string }

export interface UseButtonOptions {
	isBusy?: boolean
	ariaLabel?: string
	icon?: Component
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	variant?: 'outline' | 'primary' | 'danger'
	className?: string
	asChild?: boolean
	emitClick?: (e: Event) => void
}

export function useButton(props: UseButtonOptions, emitClick?: (event: Event) => void) {
	const instance = getCurrentInstance()
	const scopeId = (instance?.type as ComponentWithScopeId)?.__scopeId
	const slots = useSlots()
	const attrs = useAttrs()

	const variantClass = computed(() => {
		switch (props.variant) {
			case 'outline':
				return 'border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300'
			case 'danger':
				return 'bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300'
			default:
				return 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300'
		}
	})

	const commonProps = computed(() => ({
		class: cn(
			'relative inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none',
			variantClass.value,
			props.isBusy && 'text-transparent pointer-events-none',
			(props.disabled || props.isBusy) && 'opacity-40 cursor-not-allowed',
			props.className
		),
		'aria-label': props.ariaLabel,
		type: props.type ?? 'button',
		disabled: props.disabled || props.isBusy,
		onClick: (e: Event) => {
			if (!props.isBusy && !props.disabled) emitClick?.(e)
		}
	}))

	const childVNode = computed<VNode | null>(() => {
		if (!props.asChild) return null
		const vnodes = slots.default?.()
		if (!vnodes?.length) return null
		return cloneVNode(
			vnodes[0],
			{
				...commonProps.value,
				...attrs,
				...(scopeId ? { [scopeId]: '' } : {})
			},
			true
		)
	})

	return {
		attrs,
		slots,
		commonProps,
		childVNode
	}
}

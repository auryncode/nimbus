<script>
	import { toasts } from '$stores/toaster';
	import { fly } from 'svelte/transition';
	import Glassmorphism from './Glassmorphism.svelte';
</script>

<div class="fixed right-4 bottom-4 z-50 space-y-2">
	{#each $toasts as toast (toast.id)}
		<div
			class="rounded-xl ring-2 ring-amber-50"
			in:fly={{ y: 80, duration: 400 }}
			out:fly={{ y: 80, duration: 400 }}
			class:ring-indigo-500={toast.type === 'info'}
			class:ring-green-500={toast.type === 'success'}
			class:ring-red-500={toast.type === 'error'}
		>
			<Glassmorphism
				className="animate-fade-in w-[350px] p-6 rounded-xl flex flex-col gap-2"
			>
				<h1
					class="font-bold"
					class:text-indigo-500={toast.type === 'info'}
					class:text-green-500={toast.type === 'success'}
					class:text-red-500={toast.type === 'error'}
				>
					{toast.type}
				</h1>
				<p class="font-medium">{toast.message}</p>
			</Glassmorphism>
		</div>
	{/each}
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

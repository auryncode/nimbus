<script>
	import Glassmorphism from './Glassmorphism.svelte';

	let { active, label, onClick } = $props();
</script>

{#if active}
	<Glassmorphism
		className="px-5 py-2 w-[150px] text-center rounded-full cursor-pointer font-semibold text-indigo-500"
	>
		{label}</Glassmorphism
	>
{:else}
	<button
		onclick={onClick}
		class="w-[150px] cursor-pointer rounded-full px-5 py-2 text-center font-semibold"
		>{label}</button
	>
{/if}

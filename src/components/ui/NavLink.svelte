<script>
	import { page } from '$app/state';
	import Glassmorphism from './Glassmorphism.svelte';
	let { href, label } = $props();
</script>

{#if page.url.pathname === href}
	<Glassmorphism className="rounded-full py-1 px-8 w-[150px] order-last flex items-center justify-center">
		<a {href} class={`font-bold transition-all duration-200 tracking-wider`}>{label}</a>
	</Glassmorphism>
{:else}
	<a {href} class={`font-semibold transition-colors duration-200 hover:text-indigo-400 hover:font-bold`}>{label}</a>
{/if}

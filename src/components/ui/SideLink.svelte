<script>
	import { page } from '$app/state';
	import Glassmorphism from './Glassmorphism.svelte';
	let { href, label, onClick } = $props();
</script>

{#if page.url.pathname === href}
	<Glassmorphism className="rounded-xl text-center p-4">
		<a onclick={onClick} class="font-semibold text-indigo-600" {href}>{label}</a>
	</Glassmorphism>
{:else}
	<a onclick={onClick} class="rounded-xl p-4 text-center font-semibold" {href}>{label}</a>
{/if}

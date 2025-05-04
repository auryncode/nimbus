<script>
	import { AlignRight, Snowflake, X } from '@lucide/svelte';
	import NavLink from './ui/NavLink.svelte';
	import Location from './ui/Location.svelte';
	import { fly } from 'svelte/transition';
	import Glassmorphism from './ui/Glassmorphism.svelte';

	let navbar = $state(false);
	function toogleNavbar() {
		navbar = !navbar;
	}
</script>

<nav class="py-8">
	<div class="container flex items-center justify-between">
		<div class="flex items-center gap-4">
			<Snowflake size={34} color="oklch(51.1% 0.262 276.966)" />
			<h1 class="text-2xl font-black tracking-wider uppercase">Nimbus</h1>
		</div>

		<div class="flex gap-8 lg:hidden">
			<div class="md:block hidden">
				<Location />
			</div>
			<button onclick={toogleNavbar} class="block lg:hidden">
				<AlignRight size={24} />
			</button>
		</div>
		<ul class="hidden items-center gap-8 lg:flex">
			<li class="flex items-center gap-8">
				<NavLink label="Home" href="/" />
				<NavLink label="Forecasts" href="/forecasts" />
			</li>
			<li class="h-[24px] rounded-full border border-amber-50"></li>
			<li><Location /></li>
			<!-- <li><Moon /></li> -->
		</ul>
	</div>
</nav>

<div
	in:fly={{ x: 200, duration: 3000 }}
	out:fly={{ x: 200, duration: 3000 }}
	class={`fixed top-0 z-50 h-screen w-full lg:hidden ${navbar ? 'block' : 'hidden'} transition-all duration-300`}
>
	<div class=" flex h-full w-full flex-col gap-13 bg-neutral-800 p-8">
		<div class="flex justify-end">
			<button class="" onclick={toogleNavbar}><X size={24} /></button>
		</div>
		<div class="flex h-full flex-col justify-between">
			<div class="mt-13 flex flex-col gap-4">
				<Glassmorphism className="rounded-xl text-center p-4">
					<a class="font-semibold text-indigo-600" href="/">Home</a>
				</Glassmorphism>
				<a class="rounded-xl p-4 text-center font-semibold" href="/forecasts">Forecasts</a>
			</div>
			<Glassmorphism className="rounded-xl p-4 text-center font-semibold block md:hidden">
				<Location />
			</Glassmorphism>
		</div>
	</div>
</div>

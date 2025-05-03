<script>
	import { Snowflake } from '@lucide/svelte';
	import NavLink from './ui/NavLink.svelte';
	import Location from './ui/Location.svelte';
</script>

<nav class="py-8">
	<div class="container flex items-center justify-between">
		<div class="flex items-center gap-4">
			<Snowflake size={34} color="oklch(51.1% 0.262 276.966)" />
			<h1 class="text-2xl font-black tracking-wider uppercase">Nimbus</h1>
		</div>
		<ul class="flex items-center gap-8">
			<li class="flex gap-8 items-center">
				<NavLink label="Home" href="/" />
				<NavLink label="Forecasts" href="/forecasts" />
			</li>
			<li class="h-[24px] rounded-full border border-amber-50"></li>
			<li><Location /></li>
			<!-- <li><Moon /></li> -->
		</ul>
	</div>
</nav>

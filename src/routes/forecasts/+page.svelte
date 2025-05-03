<script>
	import Glassmorphism from '../../components/ui/Glassmorphism.svelte';
	import { getday } from '$lib/utills/time';
	import { PUBLIC_URL_ICON_OWM } from '$env/static/public';
	import Tab from '$components/ui/Tab.svelte';
	import { location } from '$stores/location';

	let forecasts = $state(null);
	let loading = $state(true);

	$effect(() => {
		const { lat, lon } = $location;
		if (!lat || !lon) return;

		const params = new URLSearchParams({
			lat: lat.toString(),
			lon: lon.toString()
		});

		try {
			fetch(`/api/forecasts?${params}`)
				.then((res) => res.json())
				.then((data) => {
					forecasts = data.forecasts;
					loading = false;
				});
		} catch (err) {
			console.error('Gagal fetch:', err);
		}
	});

	let tabs = $state('today');

	let filteredForecast = $derived(
		Object.keys(forecasts)
			.filter((date) => getday(date).toLowerCase() == tabs)
			.flatMap((date) => forecasts[date])
	);
</script>

{#if !loading}
	<div class="mt-13 flex">
		<Glassmorphism className="w-full sm:w-[600px] p-6 rounded-2xl">
			<h1 class="mb-3 text-3xl font-bold sm:text-5xl">
				Stay Ready with the <span class="text-indigo-600">Latest Weather Forecast</span>
			</h1>
			<p class="text-sm font-medium sm:text-base">
				You can find daily and 3-hourly weather updates in the Forecast menu. You'll see all the
				info with clear icons and quick descriptions. You can easily scroll through the hours and
				plan your day or week with confidence.
			</p>
		</Glassmorphism>
	</div>
	<div class="mt-13 flex gap-4">
		{#each Object.entries(forecasts) as [date]}
			<Tab
				onClick={() => (tabs = getday(date).toLowerCase())}
				active={tabs == getday(date).toLowerCase()}
				label={getday(date)}
			/>
		{/each}
	</div>

	<div class="flex flex-col gap-2 rounded-xl p-5">
		<div class="flex w-full flex-nowrap items-center gap-5 overflow-x-scroll scroll-smooth py-4">
			{#each filteredForecast as item}
				<Glassmorphism className="flex w-[170px] shrink-0 flex-col items-center rounded-2xl py-4">
					<img
						class="h-[100px] w-[100px]"
						src={`${PUBLIC_URL_ICON_OWM}/${item.icon}@2x.png`}
						alt="Clear Sky"
					/>
					<div class="flex w-full flex-col items-center gap-1">
						<span class="font-bold">{item.time}</span>
						<div class="flex items-center">
							<span>{item.weather}</span>
							<span class="mx-4 inline-block h-[18px] rounded-full border"></span>
							<span>{Math.round(item.temp)}°C</span>
						</div>
						<!-- <span class="text-sm font-bold">{item.weather}</span> -->
					</div>
				</Glassmorphism>
			{/each}
		</div>
	</div>
{:else}
	<p>loading</p>
{/if}

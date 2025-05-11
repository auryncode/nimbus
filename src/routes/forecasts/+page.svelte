<script>
	import Glassmorphism from '$components/ui/Glassmorphism.svelte';
	import { getday } from '$lib/utills/time';
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
		!loading &&
			Object.keys(forecasts)
				.filter((date) => getday(date).toLowerCase() == tabs)
				.flatMap((date) => forecasts[date])
	);
</script>

<svelte:head>
	<title>Forecasts | Nimbus</title>
	<meta
		name="description"
		content="Jelajahi prakiraan cuaca dan tren cuaca hingga 5 hari ke depan."
	/>
</svelte:head>

<div class="mt-13 flex">
	<Glassmorphism className="w-full md:w-[600px] p-6 rounded-2xl">
		<h1 class="mb-3 text-3xl font-bold sm:text-5xl">
			Stay Ready with the <span class="text-indigo-600">Latest Weather Forecast</span>
		</h1>
		<p class="text-sm font-medium sm:text-base">
			You can find daily and 3-hourly weather updates in the Forecast menu. You'll see all the info
			with clear icons and quick descriptions. You can easily scroll through the hours and plan your
			day or week with confidence.
		</p>
	</Glassmorphism>
</div>
{#if !loading && forecasts !== null}
	<Glassmorphism className="mt-13 overflow-x-scroll rounded-full w-full xl:w-fit">
		<div class="flex gap-4">
			{#each Object.entries(forecasts) as [date]}
				<Tab
					onClick={() => (tabs = getday(date).toLowerCase())}
					active={tabs == getday(date).toLowerCase()}
					label={getday(date)}
				/>
			{/each}
		</div>
	</Glassmorphism>
{:else}
	<div class="mt-13 block h-[40px] w-full animate-pulse rounded-full bg-gray-800"></div>
{/if}
<div class="flex flex-col gap-2 rounded-xl p-5">
	<div
		class="grid w-full grid-cols-1 gap-5 py-4 sm:grid-cols-2 lg:flex lg:flex-row lg:overflow-x-scroll lg:scroll-smooth"
	>
		{#if !loading && filteredForecast !== null}
			{#each filteredForecast as item}
				<Glassmorphism
					className="flex w-full sm:w-full lg:w-[170px] shrink-0 flex-col items-center rounded-2xl py-4"
				>
					<img class="h-[100px] w-[100px]" src={item.icon} alt="Clear Sky" />
					<div class="flex w-full flex-col items-center gap-1">
						<span class="font-bold">{item.time}</span>
						<div class="flex items-center">
							<span>{item.weather}</span>
							<span class="mx-4 inline-block h-[18px] rounded-full border"></span>
							<span>{Math.round(item.temp)}°C</span>
						</div>
					</div>
				</Glassmorphism>
			{/each}
		{:else}
			{#each Array(3) as item}
				<div
					class="block h-[170px] w-full shrink-0 animate-pulse flex-col items-center rounded-2xl bg-gray-800 sm:w-full lg:w-[170px]"
				></div>
			{/each}
		{/if}
	</div>
</div>

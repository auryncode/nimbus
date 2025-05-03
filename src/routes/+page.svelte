<script>
	import Glassmorphism from '$components/ui/Glassmorphism.svelte';
	import { location } from '$stores/location';

	let weather = $state(null);
	let infos = $state(null);
	let loading = $state(true);

	$effect(() => {
		const { lat, lon } = $location;
		if (!lat || !lon) return;

		const params = new URLSearchParams({
			lat: lat.toString(),
			lon: lon.toString()
		});

		try {
			fetch(`/api/weather?${params}`)
				.then((res) => res.json())
				.then((data) => {
					weather = data.weather;
					infos = data.infos;
					loading = false;
				});
		} catch (err) {
			console.error('Gagal fetch:', err);
		}
	});
</script>

{#if loading}
	<p>loading</p>
{:else}
	<div class="mt-13 flex flex-col items-center justify-around sm:flex-row">
		<img
			class="hidden drop-shadow-2xl sm:block sm:h-[550px] sm:w-[550px]"
			src="images/ilustrasi/weather.png"
			alt="Weather Ilustration"
		/>
		<Glassmorphism
			className="h-full sm:w-[420px] w-full flex col-end-6 flex-col justify-between py-4 px-8 rounded-4xl"
		>
			<div class="flex flex-col-reverse items-center justify-between sm:flex-row">
				<p class="m-0 text-[64px] font-semibold sm:text-[5rem]">
					{weather.temp}&deg;C
				</p>
				<div class="flex flex-col items-center">
					<img src={weather.icon} alt="Clear Sky" />
					<span class="text-lg font-bold">{weather.main}</span>
					<span class="font-medium">{weather.desc}</span>
				</div>
			</div>
			<div class="flex flex-col items-center sm:items-start">
				<p class="text-4xl font-semibold">{weather.name}</p>
				<p class="text-xl font-semibold">
					{weather.temp}&deg; Feels Like {weather.feels_like}&deg;
				</p>
			</div>
		</Glassmorphism>
	</div>

	<div class="mt-13 grid grid-cols-1 gap-8 sm:mt-28 sm:grid-cols-3">
		{#each infos as info}
			{@const Icon = info.icon}
			<Glassmorphism className="rounded-xl flex flex-col p-5 h-[8rem] justify-around">
				<div class="flex items-center gap-6">
					<Icon size={24} />
					<p class="font-bold">{info.name}</p>
				</div>
				<p class="text-center text-4xl font-bold">
					{info.value} <span class="uppercase">{info.satuan ?? ''}</span>
				</p>
			</Glassmorphism>
		{/each}
	</div>
{/if}

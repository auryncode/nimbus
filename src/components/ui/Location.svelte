<script>
	import { MapPin, X } from '@lucide/svelte';
	import { location } from '$stores/location';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { addToast } from '$stores/toaster';
	import { PUBLIC_URL_NOMINATIM } from '$env/static/public';
	import Glassmorphism from './Glassmorphism.svelte';

	let inputRef;
	let cari = $state(false);
	let refLoc = $state([]);

	async function handleClick() {
		cari = true;
		await tick();
		inputRef.focus();
	}

	function handleSearchLocation(e) {
		if (e.key !== 'Enter') return;
		const params = new URLSearchParams({
			q: e.target.value,
			format: 'json'
		});
		fetch(`${PUBLIC_URL_NOMINATIM}/search?${params}`)
			.then((res) => res.json())
			.then((data) => {
				if (!data.length) {
					addToast('Location not found', 'error');
					return;
				}
				refLoc = data;
			});
	}

	function handleChangeLocation(loc) {
		localStorage.setItem(
			'geolocation',
			JSON.stringify({
				city: loc.display_name.split(',')[0],
				lat: loc.lat,
				lon: loc.lon
			})
		);

		location.update((prev) => ({
			city: loc.display_name.split(',')[0],
			lat: loc.lat,
			lon: loc.lon
		}));

		cari = false;
	}
</script>

{#if cari}
	<div class="relative p-0">
		<div class="relative">
			<input
				in:fly={{ duration: 600, x: 80 }}
				bind:this={inputRef}
				onkeydown={handleSearchLocation}
				value={$location.city}
				type="text"
				class="h-[34px] w-full rounded-md border-2 border-gray-300 p-2 pr-8"
				placeholder="Search for a location"
			/>
			<button
				in:fly={{ duration: 600, x: 80 }}
				class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-amber-50"
				onclick={() => {
					cari = false;
					refLoc = [];
				}}
			>
				<X size={16} />
			</button>
		</div>

		{#if refLoc.length > 0}
			<Glassmorphism
				className="absolute z-50 max-h-[250px] w-full overflow-y-scroll p-4 rounded-lg flex flex-col gap-4 ring-2 ring-amber-50 bottom-[calc(100%+28px)] md:bottom-auto md:top-[calc(100%+28px)]"
			>
				{#each refLoc as loc (loc.place_id)}
					<button
						class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-r-lg border-l-4 p-2 hover:bg-indigo-600"
						onclick={() => handleChangeLocation(loc)}
					>
						<!-- <MapPin className="shrink-0" size={24} /> -->
						<span class="font-semibold capitalize">{loc.display_name}</span>
					</button>
				{/each}
			</Glassmorphism>
		{/if}
	</div>
{:else}
	<button in:fly={{ duration: 600, x: 80 }} onclick={handleClick} class="flex cursor-pointer gap-2">
		<MapPin size={20} />
		<span class="font-semibold capitalize">{$location.city}</span>
	</button>
{/if}

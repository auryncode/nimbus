<script>
	import { location } from '$stores/location';

	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';

	let map = $state();
	let Lmap = $state();

	onMount(async () => {
		const L = await import('leaflet');
		Lmap = L.map(map).setView([$location.lat, $location.lon], 9);
		L.marker([$location.lat, $location.lon]).addTo(Lmap);
		const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; Heri Riyanto'
		}).addTo(Lmap);
		const light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; Heri Riyanto'
		});
		const precipitation = L.tileLayer('api/maps/precipitation_new/{z}/{x}/{y}');
		const clouds = L.tileLayer('api/maps/clouds_new/{z}/{x}/{y}');
		const wind = L.tileLayer('api/maps/wind_new/{z}/{x}/{y}');
		const temperature = L.tileLayer('api/maps/temp_new/{z}/{x}/{y}');
		const pressure = L.tileLayer('api/maps/pressure_new/{z}/{x}/{y}');
		// const radar = L.tileLayer('api/maps/radar/{z}/{x}/{y}');
		L.control
			.layers(
				{ dark, light },
				{ precipitation, clouds, wind, temperature, pressure },
				{ collapsed: false }
			)
			.addTo(Lmap);
	});
</script>

<svelte:head>
	<title>Maps | Nimbus</title>
	<meta
		name="description"
		content="Pantau cuaca hari ini dan prediksi esok dengan mudah. Prakiraan akurat, kapan pun Anda butuhkan"
	/>
</svelte:head>

<div bind:this={map} class="h-screen"></div>

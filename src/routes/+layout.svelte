<script>
	import { location } from '$stores/location';
	import { onMount } from 'svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { get } from 'svelte/store';
	import { PUBLIC_URL_NOMINATIM } from '$env/static/public';
	import Toaster from '$components/ui/Toaster.svelte';

	let { children } = $props();

	onMount(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { coords } = position;
			const params = new URLSearchParams({
				lat: coords.latitude.toString(),
				lon: coords.longitude.toString(),
				format: 'json'
			});

			fetch(`${PUBLIC_URL_NOMINATIM}/reverse?${params}`)
				.then((res) => res.json())
				.then((data) => {
					const { address } = data;
					location.update((prev) => ({
						city: address.city,
						lat: coords.latitude,
						lon: coords.longitude
					}));
				});
		});
	});
</script>

<Navbar />
<main class="container">
	{@render children()}
</main>
<Footer />
<Toaster />

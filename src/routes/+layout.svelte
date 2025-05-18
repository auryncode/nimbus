<script>
	import { location } from '$stores/location';
	import { onMount } from 'svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { PUBLIC_URL_NOMINATIM } from '$env/static/public';
	import Toaster from '$components/ui/Toaster.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectSpeedInsights();
	injectAnalytics();

	let { children } = $props();

	onMount(() => {
		const saved = localStorage.getItem('geolocation');
		if (saved) {
			location.set(JSON.parse(saved));
			return;
		}

		navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
			if (permissionStatus.state === 'granted') {
				getUserLocation();
			}

			permissionStatus.onchange = () => {
				if (permissionStatus.state === 'granted') {
					getUserLocation();
				}
			};
		});
	});

	function getUserLocation() {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const { coords } = position;

			const params = new URLSearchParams({
				lat: coords.latitude.toString(),
				lon: coords.longitude.toString(),
				format: 'json'
			});

			const res = await fetch(`${PUBLIC_URL_NOMINATIM}/reverse?${params}`);
			const data = await res.json();
			const { address } = data;

			const newLocation = {
				city: address.city ?? address.town ?? address.village ?? 'Unknown',
				lat: coords.latitude,
				lon: coords.longitude
			};

			location.set(newLocation);
			localStorage.setItem('geolocation', JSON.stringify(newLocation));
		});
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/background/japan.jpg" />
</svelte:head>

<Navbar />
<main class="relative container">
	{@render children()}
</main>
<Footer />
<Toaster />

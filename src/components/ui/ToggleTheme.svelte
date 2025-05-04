<script>
	import { Moon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let isDark = $state(false);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark') {
			isDark = true;
			document.documentElement.classList.add('dark');
		}
	});

	function toggleDark() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<button onclick={toggleDark} class="cursor-pointer">
	<Moon />
</button>

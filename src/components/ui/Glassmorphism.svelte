<script>
	const { children, className } = $props();
</script>

<div class={`bg-white/15 backdrop-blur-xs ${className}`}>
	{@render children()}
</div>

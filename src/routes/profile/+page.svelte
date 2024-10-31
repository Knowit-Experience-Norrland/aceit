<script lang="ts">
	import IconStar from '$lib/components/icon_star.svelte';
</script>

<h1>Profilsida</h1>

<div class="bg-box">
	<IconStar width="32" height="32" fill="var(--knowit-green)" />

	<h2>Namn Namnsson</h2>
	<p>namn.namnsson@knowit.se</p>
	<a href="/target-page">Logga ut</a>
</div>

<style lang="scss">
	:root {
		--knowit-green: #{$knowit-green};
	}
</style>

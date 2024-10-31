<script lang="ts">
	import Icon from '$lib/components/icon.svelte';
</script>

<h1>Profilsida</h1>

<div class="bg-box">
	<Icon width="32" height="32" fill="green" />
	<h2>Namn Namnsson</h2>
	<p>namn.namnsson@knowit.se</p>
	<a href="/target-page">Logga ut</a>
</div>



<style lang="scss">
	.bg-box {
		background-color: blue;
		padding: 1.5rem 2rem;
	}
</style>

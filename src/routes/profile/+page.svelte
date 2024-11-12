<script lang="ts">
	import IconStar from '$lib/components/icon_star.svelte';
</script>

<h1>Profilsida</h1>

<div class="card">
	<IconStar
		width="32"
		height="32"
		fill="icon"
	/>
 
	<h2>Namn Namnsson</h2>
	<p>namn.namnsson@knowit.se</p>
	<form action="/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
	
</div>

<style lang="scss">

</style>

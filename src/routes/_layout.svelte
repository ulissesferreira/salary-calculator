<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 480px;
		background-color: white;
		margin: 0 auto;
		box-sizing: border-box;
		height: calc(100vh - 57px);
		padding: 1rem 0.5rem;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		/* padding: 0 1.5rem; */
		max-width: 480px;
		margin: auto;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
	}

	li {
		cursor: pointer;
	}

	li:last-of-type {
		margin-left: auto;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1rem);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1rem 0.5rem;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Líquido</a></li>
		<li><a aria-current="{segment === 'net' ? 'page' : undefined}" href="net">Bruto</a></li>
		<li><a aria-current="{segment === 'settings' ? 'page' : undefined}" href="settings">Definições</a></li>
	</ul>
</nav>

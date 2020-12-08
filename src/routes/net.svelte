<script>
	import {
		getGrossMonthlySalary
	} from '../utils/tax'

	let netMonthlySalary
	let grossSalary = 0

	$: {
		grossSalary = getGrossMonthlySalary(netMonthlySalary) * 14
	}
</script>

<style>
	.c-NumberInput {
		padding: 8px;
		width: 100%;
		border-radius: 4px;
		border: 1px solid black;
		margin-bottom: 1rem;
	}
</style>

<svelte:head>
	<title>Calcular Salário Bruto</title>
</svelte:head>

<h1>Objetivo líquido mensal</h1>
<input
	class="c-NumberInput"
	placeholder="0"
	type="number"
	bind:value={netMonthlySalary}
>

<h1>Tem que pedir</h1>
<p id="gross-salary">{grossSalary}€ por ano</p>

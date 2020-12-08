<script>
	import {
		getMonthlyNetIncome,
		getAnnualNetIncome
	} from '../utils/tax'

	/**
	 * Inputs
	 */
	let isYearly = true
	let grossSalary
	let hasMealAllowance = true

	/**
	 * Outputs
	 */
	let grossMonthlySalary = 0
	let netSalary = 0
	let netMonthlySalary = 0

	$: {

		if (grossSalary == null) {
			grossMonthlySalary = 0
		} else if (isYearly) {
			grossMonthlySalary = grossSalary / 14
		} else {
			grossMonthlySalary = grossSalary
		}

		netSalary = getAnnualNetIncome(grossMonthlySalary, 0, 22, hasMealAllowance)
		netMonthlySalary = getMonthlyNetIncome(grossMonthlySalary, 0, 22, hasMealAllowance)
	}
</script>

<style>
	.gross-salary-page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.controllers {
		flex: 1;
	}

	.c-NumberInput {
		padding: 8px;
		width: 100%;
		border-radius: 4px;
		border: 1px solid black;
	}

	input {
		margin-bottom: 1rem;
	}

	.meal-allowance {
		display: block;
	}

	.time-selector {
		position: absolute;
		display: flex;
		box-sizing: border-box;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 99px;
		background-color: rgba(255,62,0,0.1);
		width: 500px;
		overflow: hidden;
	}

	.monthly,
	.yearly {
		flex: 1;
		cursor: pointer;
	}

	.monthly > p,
	.yearly > p {
		text-align: center;
	}

	.monthly {
		border-right: 0.5px solid white;
	}

	.yearly {
		border-left: 0.5px solid white;
	}

	.active {
		background-color: #ffd6a5;
	}
</style>

<svelte:head>
	<title>Calcular Salário Líquido</title>
</svelte:head>

<div class="gross-salary-page">
	<div class="controllers">
		<h1>Salário bruto</h1>
		<input
			class="c-NumberInput"
			placeholder="0"
			type="number"
			bind:value={grossSalary}
		>

		<label class="meal-allowance">
			<input type=checkbox bind:checked={hasMealAllowance}>
			Retirar subsidio de alimentação?
		</label>

		<h1>Vai receber</h1>
		<p>{Number(netMonthlySalary).toFixed(2)}€ por mês (com duodécimos)</p>
		<p>{Number(netSalary).toFixed(2)}€ por ano</p>
	</div>

	<div class="time-selector">
		<div
			class:active={!isYearly}
			class="monthly"
			on:click={_ => {isYearly = false}}
		>
			<p>Mensais</p>
		</div>
		<div
			class:active={isYearly}
			class="yearly"
			on:click={_ => {isYearly = true}}
		>
			<p>Anuais</p>
		</div>
	</div>

</div>

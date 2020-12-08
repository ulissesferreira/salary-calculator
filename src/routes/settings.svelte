<script>
	import { get } from 'svelte/store'
	import {
		dependents,
		socialSecurityPercentage,
		mealAllowance,
		twelfths
	} from '../store/settings.js'

	let _mealAllowance = get(mealAllowance)
	let _dependents = get(dependents)
	let _socialSecurityPercentage = get(socialSecurityPercentage)
	let _twelfths = get(twelfths)

	$: {
		mealAllowance.set(_mealAllowance)
		dependents.set(_dependents)
		socialSecurityPercentage.set(_socialSecurityPercentage)
		twelfths.set(_twelfths)
	}
</script>

<svelte:head>
	<title>Definições</title>
</svelte:head>

<h1>Subsídio de alimentação</h1>
<input
	bind:value={_mealAllowance}
>

<h1>Numero de dependentes</h1>
<select bind:value={_dependents}>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5+</option>
</select>

<h1>Taxa segurança social</h1>
<input bind:value={_socialSecurityPercentage}>

<h1>Recebe duodécimos?</h1>
<select bind:value={_twelfths}>
  <option value={true}>Sim</option>
  <option value={false}>Não</option>
</select>

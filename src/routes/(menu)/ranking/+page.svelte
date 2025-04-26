<script lang="ts">
	import GoldMedal from '$lib/images/medalha-ouro-estrela.png';
	import SilverMedal from '$lib/images/medalha-prata-estrela.png';
	import BronzeMedal from '$lib/images/medalha-bronze-estrela.png';

	let { data } = $props();
</script>

<svelte:head>
	<title>Classificação | Acerta ou Zika</title>
</svelte:head>

<h1 class="mb-4 px-1 py-2 text-xl font-bold">CLASSIFICAÇÃO</h1>

<div class="flex flex-col">
	{#each data.ranking as userRanked, index}
		<div class="bg-base-200 border-base-100 collapse border">
			<input type="checkbox" class="!min-h-0 !p-0" checked />
			<div
				class="collapse-title inline-flex min-h-0 items-center justify-between gap-2 px-4 py-3 font-semibold"
			>
				<span class="font-mono">{index + 1}°</span>
				<span class="grow">{userRanked.user_name}</span>
				<span class="font-mono">{userRanked.points}</span>
			</div>
			<div class="collapse-content inline-flex items-center justify-between gap-2">
				Medalhas
				<div class="inline-flex gap-2">
					<div class="inline-flex items-center gap-1.5 font-mono">
						{userRanked.gold_medals}
						<img src={GoldMedal} alt="Medalha de Ouro" class="h-6 w-6" />
					</div>
					<div class="inline-flex items-center gap-1.5 font-mono">
						{userRanked.silver_medals}
						<img src={SilverMedal} alt="Medalha de Prata" class="h-6 w-6" />
					</div>
					<div class="inline-flex items-center gap-1.5 font-mono">
						{userRanked.bronze_medals}
						<img src={BronzeMedal} alt="Medalha de Bronze" class="h-6 w-6" />
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

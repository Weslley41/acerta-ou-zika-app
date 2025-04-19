<script lang="ts">
	import Match from '$lib/components/Match.svelte';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	const totalPoints = $derived(data.guesses.reduce((a, g) => a + g.points_earned, 0));

	onMount(() => {
		const container = document.querySelector('.collapse-content') as HTMLDivElement;
		const activeRound = data.guesses[0].match.round;
		const target = document.querySelector(`a[href="/rodada/${activeRound}"]`) as HTMLAnchorElement;
		if (target) {
			const offset = target.offsetLeft - container.offsetLeft;
			container.scrollTo({
				left: offset - container.clientWidth / 2,
				behavior: 'smooth'
			});
		}
	});
</script>

<svelte:head>
	<title>Rodada {data.guesses[0].match.round.toString().padStart(2, '0')} | Acerta ou Zika</title>
</svelte:head>

{#if page.error}
	<p class="text-red-500">{page.error.message}</p>
{:else}
	<div class="group collapse">
		<input type="checkbox" class="!min-h-min !p-0" />

		<div class="collapse-title inline-flex h-fit !min-h-min items-center justify-between px-1 py-2">
			<div class="inline-flex items-center gap-4">
				<h1 class="gap-2 text-xl font-bold">
					RODADA {data.guesses[0].match.round.toString().padStart(2, '0')}
				</h1>
				<span class="text-sm font-bold {totalPoints > 0 ? 'text-success' : 'opacity-65'}">
					+{totalPoints}pts
				</span>
			</div>

			<Icon icon="mdi:chevron-down" class="h-8 w-8 group-has-[input:checked]:hidden" />
			<Icon icon="mdi:chevron-up" class="hidden h-8 w-8 group-has-[input:checked]:block" />
		</div>

		<div class="collapse-content no-scrollbar flex gap-1 overflow-x-scroll px-1">
			{#each { length: 38 } as _, round}
				<a
					onclick={(e) => {
						const target = e.currentTarget as HTMLAnchorElement;
						const container = document.querySelector('.collapse-content') as HTMLDivElement;
						const offset = target.offsetLeft - container.offsetLeft;
						container.scrollTo({
							left: offset - container.clientWidth / 2,
							behavior: 'smooth'
						});
					}}
					href="/rodada/{round + 1}"
					class="{data.guesses[0].match.round === round + 1
						? 'bg-primary text-primary-content'
						: 'bg-base-300'} inline-flex h-8 !w-8 min-w-8 items-center justify-center rounded"
				>
					{String(round + 1).padStart(2, '0')}
				</a>
			{/each}
		</div>
	</div>

	<div class="flex flex-col">
		{#each data.guesses as guess, index}
			<Match {guess} {index} />
		{/each}
	</div>
{/if}

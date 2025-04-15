<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import Icon from '@iconify/svelte';

	import { MatchStatus, type MatchGuess } from '$lib/types';
	import { GuessScore } from '$lib/utils';
	import bronzeMedal from '$lib/images/medalha-bronze.png';
	import goldMedal from '$lib/images/medalha-ouro.png';
	import silverMedal from '$lib/images/medalha-prata.png';
	import bronzeMedalStar from '$lib/images/medalha-bronze-estrela.png';
	import goldMedalStar from '$lib/images/medalha-ouro-estrela.png';
	import silverMedalStar from '$lib/images/medalha-prata-estrela.png';

	let { guess, index }: { guess: MatchGuess; index: number } = $props();
	let guessScore = $derived(new GuessScore(guess));
	let guessHomeScore = $state(guess.home_score);
	let guessAwayScore = $state(guess.away_score);

	$effect(() => {
		guessHomeScore = guess.home_score;
		guessAwayScore = guess.away_score;
	});

	function handleDateTime(date: string) {
		return new Date(date).toLocaleString([], {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getImageMedal() {
		if (guessScore.pointsEarned === 10) return goldMedal;
		if (guessScore.pointsEarned > 5) return silverMedal;
		return bronzeMedal;
	}

	function getImageMedalWithStar() {
		if (guessScore.pointsEarned === 10) return goldMedalStar;
		if (guessScore.pointsEarned > 5) return silverMedalStar;
		return bronzeMedalStar;
	}

	function getMedalContentClass() {
		if (guessScore.pointsEarned === 10) return 'gold-medal-content';
		if (guessScore.pointsEarned > 5) return 'silver-medal-content';
		return 'bronze-medal-content';
	}

	function incrementHomeScore() {
		guessHomeScore++;
	}
	function incrementAwayScore() {
		guessAwayScore++;
	}
	function decrementHomeScore() {
		if (guessHomeScore > 0) {
			guessHomeScore--;
		}
	}
	function decrementAwayScore() {
		if (guessAwayScore > 0) {
			guessAwayScore--;
		}
	}

	function nextGuess() {
		guessModal.close();
		const nextModal = document.getElementById(`guess-${index + 1}-modal`) as HTMLDialogElement;
		if (nextModal) {
			nextModal.showModal();
		}
	}

	function handleSubmit(event: Event) {
		if (
			guess.match.status !== MatchStatus.NotStarted ||
			(guessHomeScore === guess.home_score && guessAwayScore === guess.away_score)
		) {
			event.preventDefault();
			nextGuess();
		}
	}

	let guessModal: HTMLDialogElement;
</script>

<button
	class="bg-base-100 hover:bg-base-200 relative inline-flex h-16 justify-between gap-2 rounded-lg p-2"
	onclick={() => guessModal.showModal()}
>
	<div class="inline-flex gap-2">
		<p class="w-10 self-center text-center text-xs font-semibold opacity-65 font-mono">
			{new Date(guess.match.start_time).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})}
			{new Date(guess.match.start_time).toLocaleDateString([], {
				day: '2-digit',
				month: '2-digit'
			})}
		</p>

		<div class="space-y-2">
			<div class="flex flex-row items-center gap-2">
				<img
					src={guess.match.home_team.icon}
					alt="escudo do time mandante: {guess.match.home_team.name}"
					class="h-5 w-5"
				/>
				<p class="text-xs font-bold uppercase">{guess.match.home_team.name}</p>
			</div>

			<div class="flex flex-row items-center gap-2">
				<img
					src={guess.match.away_team.icon}
					alt="escudo do time visitante: {guess.match.away_team.name}"
					class="h-5 w-5"
				/>
				<p class="text-xs font-bold uppercase">{guess.match.away_team.name}</p>
			</div>
		</div>
	</div>

	<div class="inline-flex gap-2">
		<div class="inline-flex w-20 items-center justify-center self-center">
			{#if guess.match.status === MatchStatus.InProgress}
				<div class="inline-grid *:[grid-area:1/1]">
					<div class="status status-error animate-ping"></div>
					<div class="status status-error"></div>
				</div>
				<span class="pl-1 text-xs font-semibold uppercase">Ao vivo</span>
			{:else if guess.match.status === MatchStatus.Finished && guess.points_earned}
				<img src={getImageMedalWithStar()} alt="Medalha de pontuação" class="w-2/5" />
			{/if}
		</div>

		<div class="flex flex-col gap-2 w-7 font-mono">
			<div class="inline-flex grow items-center gap-0.5 font-bold">
				<p class="text-lg leading-0">{guessHomeScore}</p>
				{#if guess.match.status !== MatchStatus.NotStarted}
					<span class="self-end text-[10px] opacity-40">[{guess.match.home_score}]</span>
				{/if}
			</div>
			<div class="inline-flex grow items-center gap-0.5 font-bold">
				<p class="text-lg leading-0">{guessAwayScore}</p>
				{#if guess.match.status !== MatchStatus.NotStarted}
					<span class="self-end text-[10px] opacity-40">[{guess.match.away_score}]</span>
				{/if}
			</div>
		</div>
	</div>
</button>

<dialog id="guess-{index}-modal" class="modal" bind:this={guessModal}>
	<div class="modal-box pt-10">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
				<Icon icon="mdi:close" class="h-6 w-6" />
			</button>
		</form>

		<div class="grid grid-cols-3 gap-4">
			<div>
				<figure class="mb-2 rounded-xl bg-neutral-100 p-3">
					<img
						class="aspect-square"
						src={guess.match.home_team.icon}
						alt="escudo do time mandante: {guess.match.home_team.name}"
					/>
				</figure>
				<p class="text-center text-sm font-semibold uppercase">{guess.match.home_team.name}</p>
			</div>

			<div class="flex flex-col">
				{#if guess.match.status === MatchStatus.Finished}
					<p class="h-6 text-center text-xs font-semibold opacity-75">Encerrado</p>
				{:else}
					<span
						class="self-center {guess.match.status === MatchStatus.InProgress
							? 'visible'
							: 'invisible'}"
					>
						<div class="inline-grid *:[grid-area:1/1]">
							<div class="status status-error animate-ping"></div>
							<div class="status status-error"></div>
						</div>
						<span class="pl-1 text-xs font-semibold uppercase">Ao vivo</span>
					</span>
				{/if}
				<p class="text-center text-4xl font-bold">{guessHomeScore} x {guessAwayScore}</p>
				<p class="text-center text-xs font-semibold opacity-75">
					{handleDateTime(guess.match.start_time)}
				</p>
				{#if guess.match.status !== MatchStatus.NotStarted}
					<p class="text-center text-xs font-semibold opacity-75">Placar Real</p>
					<p class="text-center text-xs font-semibold opacity-75">
						{guess.match.home_score} x {guess.match.away_score}
					</p>
				{/if}
			</div>

			<div>
				<figure class="mb-2 rounded-xl bg-neutral-100 p-3">
					<img
						class="aspect-square"
						src={guess.match.away_team.icon}
						alt="escudo do time visitante: {guess.match.away_team.name}"
					/>
				</figure>
				<p class="text-center text-sm font-semibold uppercase">{guess.match.away_team.name}</p>
			</div>
		</div>

		<div class="mt-4 flex flex-col gap-2">
			{#if guess.match.status === MatchStatus.NotStarted}
				<div class="inline-flex w-full gap-1">
					<button class="btn btn-accent btn-square" onclick={decrementHomeScore}>
						<Icon icon="mdi:minus" class="h-6 w-6" />
					</button>
					<button class="btn btn-accent grow" onclick={incrementHomeScore}>
						<span class="grow uppercase">{guess.match.home_team.name}</span>
						<Icon icon="mdi:plus" class="h-6 w-6" />
					</button>
				</div>
				<div class="inline-flex w-full gap-1">
					<button class="btn btn-accent btn-square" onclick={decrementAwayScore}>
						<Icon icon="mdi:minus" class="h-6 w-6" />
					</button>
					<button class="btn btn-accent grow" onclick={incrementAwayScore}>
						<span class="grow uppercase">{guess.match.away_team.name}</span>
						<Icon icon="mdi:plus" class="h-6 w-6" />
					</button>
				</div>
			{:else}
				<p class="text-center font-semibold uppercase">Sua pontuação</p>
				<div
					class="data-[correct=true]:text-accent inline-flex justify-between font-semibold data-[correct=false]:opacity-65"
					data-correct={guessScore.isResultGuessRight}
				>
					<p>Resultado final</p>
					<p>{guessScore.isResultGuessRight ? '+ 5' : 0}</p>
				</div>
				<div
					class="data-[correct=true]:text-accent inline-flex justify-between font-semibold data-[correct=false]:opacity-65"
					data-correct={guessScore.isHomeGolsRight}
				>
					<p>Número de gols do mandante</p>
					<p>{guessScore.isHomeGolsRight ? '+ 2' : 0}</p>
				</div>
				<div
					class="data-[correct=true]:text-accent inline-flex justify-between font-semibold data-[correct=false]:opacity-65"
					data-correct={guessScore.isAwayGolsRight}
				>
					<p>Número de gols do visitante</p>
					<p>{guessScore.isAwayGolsRight ? '+ 2' : 0}</p>
				</div>
				<div
					class="data-[correct=true]:text-accent inline-flex justify-between font-semibold data-[correct=false]:opacity-65"
					data-correct={guessScore.isGolsDifferenceRight}
				>
					<p>Diferença de gols</p>
					<p>{guessScore.isGolsDifferenceRight ? '+ 1' : 0}</p>
				</div>

				{#if guessScore.pointsEarned > 0}
					<div class="relative mt-2 w-20 self-center">
						<img src={getImageMedal()} alt="Medalha de pontuação" />
						<p class="medal-content {getMedalContentClass()}">
							{guessScore.pointsEarned}
						</p>
					</div>
				{:else}
					<div class="bg-base-300 h-20 w-2/5 self-center rounded-xl px-4 py-2">
						<p class="text-center text-xs font-semibold uppercase opacity-75">Total</p>
						<p class="text-center text-4xl font-semibold">
							{guessScore.pointsEarned}
						</p>
					</div>
				{/if}
			{/if}

			<form
				method="post"
				use:enhance={() => {
					return async ({ result }) => {
						nextGuess();
						if (result.type === 'failure') {
							toast.error(String(result.data?.message || 'Erro ao salvar palpite.'), {
								position: 'top-center'
							});
						}
					};
				}}
			>
				<input type="hidden" name="guess_id" value={guess.id} />
				<input type="hidden" name="home_score" bind:value={guessHomeScore} />
				<input type="hidden" name="away_score" bind:value={guessAwayScore} />
				<button class="btn btn-primary mt-4 w-full uppercase" onclick={handleSubmit}>
					Continuar
				</button>
			</form>
		</div>
	</div>
</dialog>

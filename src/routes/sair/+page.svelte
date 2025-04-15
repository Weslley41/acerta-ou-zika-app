<script lang="ts">
	function splashImage() {
		const index = Math.floor(Math.random() * 5) + 1;
		return `https://static.acertaouzika.me/logout-${index}.png`;
	}
</script>

<svelte:head>
	<title>Sair | Acerta ou Zika</title>
</svelte:head>

<div class="mt-32 mb-16 flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">Acerta ou Zika</h1>

	<img
		src={splashImage()}
		alt="Uma arte retratando uma pessoa indo embora"
		class="my-4 h-auto w-3/4"
	/>

	<p class="px-8 pb-4 text-center">Sessão encerrada! Redirecionando...</p>
</div>

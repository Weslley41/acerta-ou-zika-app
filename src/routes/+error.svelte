<script lang="ts">
	import { page } from '$app/state';

	console.error(page.error);
	function splashImage() {
		const index = Math.floor(Math.random() * 5) + 1;
		return `https://static.acertaouzika.me/error-${index}.png`;
	}
</script>

<svelte:head>
	<title>Erro | Acerta ou Zika</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mt-32 mb-16 flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">Acerta ou Zika</h1>
	<img
		src={splashImage()}
		alt="Uma arte de uma pessoa pessoa perdendo um pênalti, simbolizando um erro"
		class="my-4 h-auto w-3/4"
	/>

	<p class="px-8 pb-4 text-center">Ocorreu ao processar suas informações.</p>
	<button class="btn btn-primary" onclick={() => window.location.reload()}>
		TENTAR NOVAMENTE
	</button>
</div>

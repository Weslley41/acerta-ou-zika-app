<script>
	import { PUBLIC_API_URL } from '$env/static/public';
	import GoogleBtn from '$lib/components/GoogleBtn.svelte';
	import splashImage from '$lib/images/splash-login.png';

	function loginWithGoogle() {
		window.location.href = PUBLIC_API_URL + '/auth/google';
	}
</script>

<svelte:head>
	<title>Entrar | Acerta ou Zika</title>
</svelte:head>

<div class="mt-32 mb-16 flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">Acerta ou Zika</h1>

	<img
		src={splashImage}
		alt="Uma arte de futebol retratando um atacante chutando ao gol enquanto zagueiro tentar bloquear o chute"
		class="my-4 h-auto w-3/4"
	/>

	<p class="px-8 pb-4 text-center">
		Crie um conta ou continue em uma já existente e comece a palpitar agora nos jogos do
		Brasileirão!
	</p>

	<GoogleBtn onclick={loginWithGoogle} />
</div>

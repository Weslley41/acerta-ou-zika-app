<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
	let { children } = $props();
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Toaster richColors closeButton />
{@render children()}

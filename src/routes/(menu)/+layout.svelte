<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: Snippet<[]>; data: LayoutServerData } = $props();

	const initialOptions = $state([
		{ label: 'Tabela', href: '/tabela', icon: 'mdi:format-list-numbered', active: true },
		{ label: 'Rodada', href: '/rodada/' + data.round, icon: 'mdi:soccer', active: false },
		{ label: 'Ranking', href: '/ranking', icon: 'mdi:trophy', active: false },
		{ label: 'Configurações', href: '/configuracoes', icon: 'mdi:settings-outline', active: false }
	]);

	const options = $derived(
		initialOptions.map((option) => ({
			...option,
			active: option.href === page.url.pathname
		}))
	);
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Acerta Ou Zika</a>
	</div>
	<div class="flex gap-2">
		<div class="dropdown dropdown-end pr-2">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					{#if data.user?.icon}
						<img alt="Foto do usuário" src={data.user.icon} />
					{:else}
						<Icon icon="mdi:user" class="h-10 w-10" />
					{/if}
				</div>
			</div>
			<ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
				<li>
					<a href="/perfil" class="justify-between">Perfil</a>
				</li>
				<li>
					<a href="/sair" class="justify-between">Sair</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="m-2 mb-20">
	{@render children()}
</div>

<nav class="dock">
	{#each options as option}
		<a href={option.href} class={option.active ? 'dock-active' : ''}>
			<Icon icon={option.icon} class="h-8 w-8" />
		</a>
	{/each}
</nav>

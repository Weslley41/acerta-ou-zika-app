<script lang="ts">
	import Icon from "@iconify/svelte";
	import { page } from "$app/state";
	import '../app.css';

	let { children } = $props();

	const initialOptions = $state([
		{ label: 'Tabela', href: '/tabela', icon: 'mdi:format-list-numbered', active: true },
		{ label: 'Rodada', href: '/rodada', icon: 'mdi:soccer', active: false },
		{ label: 'Configurações', href: '/configuracoes', icon: 'mdi:settings-outline', active: false },
	])
  
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
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a href="/perfil" class="justify-between">
            Perfil
          </a>
        </li>
        <li><button>Sair</button></li>
      </ul>
    </div>
  </div>
</div>
{@render children()}
<nav class="dock">
	{#each options as option}
		<a href={option.href} class="{option.active ? 'dock-active' : ''}">
			<Icon icon={option.icon} class="w-8 h-8"/>
		</a>
	{/each}
</nav>

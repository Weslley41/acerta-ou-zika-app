<script lang="ts">
  import Match from "$lib/components/Match.svelte";
  import { page } from "$app/state";
	import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if page.error}
  <p class="text-red-500">{page.error.message}</p>
{:else}
  <div class="flex flex-col">
    {#each data.matches as match}
      <Match
        homeTeam={match.home_team}
        awayTeam={match.away_team}
        startTime={match.start_time}
        homeScore={match.home_score}
        awayScore={match.away_score}
      />  
    {/each}
  </div>
{/if}
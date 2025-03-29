<script lang="ts">
  import Round from "$lib/components/Round.svelte";

  let rounds = [
    {
      homeTeam: "Flamengo",
      awayTeam: "Palmeiras",
      datetime: "2022-11-27T20:00:00.000Z",
    },
    {
      homeTeam: "São Paulo",
      awayTeam: "Atlético-MG",
      datetime: "2022-11-27T20:00:00.000Z",
    },
    {
      homeTeam: "Corinthians",
      awayTeam: "Santos",
      datetime: "2022-11-27T20:00:00.000Z",
    },
    {
      homeTeam: "Internacional",
      awayTeam: "Grêmio",
      datetime: "2022-11-27T20:00:00.000Z",
    },
  ];
</script>

{#each rounds as round}
  <Round
    homeTeam={round.homeTeam}
    awayTeam={round.awayTeam}
    datetime={round.datetime}
  />  
{/each}
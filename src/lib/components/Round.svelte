<script lang="ts">
  let {
    datetime,
    homeTeam,
    awayTeam
  } = $props();
</script>

<button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
  {new Date(datetime).toLocaleDateString('pt-BR')} - {homeTeam} x {awayTeam}
</button>
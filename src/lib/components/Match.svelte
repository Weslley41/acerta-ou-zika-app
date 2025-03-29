<script lang="ts">
  let {
    startTime,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore
  } = $props();

  function handleDateTime(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2})/, '$1/$2 $4');
  }
</script>

<button class="btn btn-lg m-2 justify-between">
  <!-- {new Date(startTime).toLocaleDateString('pt-BR')} - {homeTeam.name} x {awayTeam.name} -->
  <div class="flex flex-row items-center">
    <img src="{homeTeam.icon}" alt="escudo-{homeTeam.name}" class="w-8 h-8 mr-2">
    <span class="text-xs">{homeTeam.name}</span>
  </div>
   
  <div class="flex flex-col px-2 absolute left-1/2 -translate-x-1/2">
    <span class="text-xs">{homeScore} x {awayScore}</span>
    <span class="text-xs">{handleDateTime(startTime)}</span>
  </div>

  <div class="flex flex-row items-center">
    <span class="text-xs">{awayTeam.name}</span>
    <img src="{awayTeam.icon}" alt="escudo-{awayTeam.name}" class="w-8 h-8 ml-2">
  </div>
</button>
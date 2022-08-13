<script>
  export let data;
</script>

{#each data.hourly as hour}
  <p>
    {new Date(hour.dt * 1000).getHours()}, {new Date(
      hour.dt * 1000
    ).toDateString()}, {hour.temp}
  </p>
{/each}

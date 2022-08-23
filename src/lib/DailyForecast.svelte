<script>
  import { timeFormat } from "d3-time-format";

  export let data;

  let days = data.daily;
</script>

{#each days as day}
  <div class="entry">
    <div class="day">
      {timeFormat("%a")(new Date(day.dt * 1000))}
    </div>
    <div class="temp">{day.temp.day}</div>
  </div>
{/each}

<style>
  .entry {
    flex: auto;
    flex-direction: row;
  }

  .day {
    font-weight: bold;
    text-align: left;
  }

  .temp {
    margin-left: 1rem;
    text-align: right;
    font-family: "IBM Plex Mono";
    font-weight: normal;
  }
</style>

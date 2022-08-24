<script>
  import { timeFormat } from "d3-time-format";

  export let data;

  let days = data.daily;
</script>

{#each days as day}
  <div class="flex flex-row space-x-3 space-y-4 max-w-full items-end">
    <div class="text-left w-1/2 font-bold">
      {timeFormat("%a")(new Date(day.dt * 1000))}
    </div>
    <div class="temp-range flex flex-row space-x-5 w-1/2">
      <div class="flex flex-row w-1/3">
        <span class="mr-3">Max: </span>
        <div class="font-digits font-bold">{day.temp.max}</div>
      </div>
      <div class="flex flex-row w-1/3">
        <span class="mr-3">Avg: </span>
        <div class="font-digits font-bold">{day.temp.day}</div>
      </div>
      <div class="flex flex-row w-1/3">
        <span class="mr-3">Min: </span>
        <div class="font-digits font-bold">{day.temp.min}</div>
      </div>
    </div>
  </div>
{/each}

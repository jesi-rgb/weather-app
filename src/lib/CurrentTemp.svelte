<script>
  export let data;
  import { SvelteWeather, Cloud } from "svelte-weather-icons";

  const current = Math.round(data.current.temp);
  const weatherIcon = data.current.weather[0].main;
  console.log(weatherIcon);
</script>

<div class="bg-teal-900 rounded-lg p-5">
  <p class="text-left text-xl">It's currently</p>
  <div class="flex flex-row">
    <p class="text-8xl text-left font-bold font-digits text-teal-100 w-1/2">
      {current.toString() + "ºC"}
    </p>

    <div class="w-1/2">
      <SvelteWeather color="#CCFBF1" size="6em" d={Cloud} />
    </div>
  </div>
</div>

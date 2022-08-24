<script>
  import CurrentTemp from "./CurrentTemp.svelte";
  import DailyForecast from "./DailyForecast.svelte";
  import LineChart from "./LineChart.svelte";
  import { data } from "./variables";

  async function getCall() {
    // const res = await fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=37.766667&lon=-3.771111&appid=2e4a4f8c33bace5f7e079b47aed02a6c&units=metric`
    // );
    // const text = await res.json();
    const text = data;
    return text;
  }

  let promise = getCall();
</script>

{#await promise}
  <p>loading data...</p>
{:then data}
  <div class="flex flex-col space-y-20 mx-auto">
    <div class="">
      <CurrentTemp {data} />
    </div>

    <div class="">
      <div class="text-left text-2xl">
        Temperature per hour today, <b>
          {new Date().toLocaleDateString("es-ES")}</b
        >
      </div>
      <LineChart {data} />
    </div>

    <div class="bg-teal-900 p-5 rounded-lg">
      <div class="text-left font-bold mb-3 text-2xl">
        Forecast for next 5 days
      </div>
      <DailyForecast {data} />
    </div>
  </div>
{/await}

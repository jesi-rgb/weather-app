<script>
  import CurrentTemp from "./CurrentTemp.svelte";
  import DailyForecast from "./DailyForecast.svelte";
  import LineChart from "./LineChart.svelte";
  import { data } from "./variables";

  async function getCall() {
    // const res = await fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=35&appid=2e4a4f8c33bace5f7e079b47aed02a6c&units=metric`
    // );
    // const text = await res.json();
    const text = data;
    return text;
  }

  let promise = getCall();
</script>

<CurrentTemp {data} />

<div class="day-section">
  <div class="title-temp-hour">
    Temperature per hour today, {new Date().toLocaleDateString("es-ES")}
  </div>
  {#await promise}
    <p>loading data...</p>
  {:then data}
    <LineChart {data} />
  {/await}
</div>

<div class="week-section">
  <div class="title-week-forecast">Forecast for next 5 days</div>
  <DailyForecast {data} />
</div>

<style>
  .title-temp-hour {
    font-family: Inter;
    font-weight: bold;
    left: 100%;
    text-align: left;
  }
  .title-week-forecast {
    font-family: Inter;
    font-weight: bold;
    left: 100%;
    text-align: left;
    margin-bottom: 2em;
  }
  .day-section {
    margin-top: 5rem;
  }
  .week-section {
    margin-top: 5rem;
  }
</style>

<script>
  import CurrentTemp from "./CurrentTemp.svelte";
  import DailyForecast from "./DailyForecast.svelte";
  import HourlyForecastChart from "./HourlyForecastChart.svelte";
  import { weatherData, geoData } from "./variables";
  import { fade } from "svelte/transition";

  async function getGeocode(address) {
    const res = await fetch("https://geocode.maps.co/search?q=" + address);
    const gData = await res.json();
    return gData[0];
  }

  /**
   * @param {string} address
   */
  async function getWeather(address) {
    let gData = await getGeocode(address);
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        gData.lat +
        "&lon=" +
        gData.lon +
        "&appid=2e4a4f8c33bace5f7e079b47aed02a6c&units=metric"
    );
    const wData = await res.json();
    return wData;
  }

  async function getStaticData() {
    return weatherData;
  }

  //   let cityName = "Cádiz";
  //   let weatherPromise = getWeather(cityName);

  let cityName = "Jaén";
  let weatherPromise = getStaticData();

  //   let weatherPromise;
  //   let cityName;
  function webos(event) {
    if (event.key === "Enter") {
      cityName = document.getElementById("cityNameForm").value;
      weatherPromise = getWeather(cityName);
    }
  }
</script>

<input type="text" id="cityNameForm" on:keydown={webos} />

{#await weatherPromise}
  <p>loading data...</p>
{:then data}
  <div
    transition:fade={{ duration: 600 }}
    class="flex flex-col space-y-20 mx-auto"
  >
    <div class="">
      <CurrentTemp {data} {cityName} />
    </div>

    <div class="">
      <div class="text-left text-2xl mb-3">
        Temperature per hour today, <b>
          {new Date().toLocaleDateString("es-ES")}</b
        >
      </div>
      <HourlyForecastChart {data} />
    </div>

    <div class="bg-teal-900 p-5 rounded-lg">
      <div class="text-left font-text font-bold mb-3 text-2xl">
        Forecast for next 5 days
      </div>
      <DailyForecast {data} />
    </div>
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}

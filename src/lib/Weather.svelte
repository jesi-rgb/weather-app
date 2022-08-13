<script>
  import Data from "./Data.svelte";
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

{#await promise}
  <p>loading data...</p>
{:then data}
  <Data {data} />
{/await}

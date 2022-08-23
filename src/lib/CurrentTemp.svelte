<script>
  export let data;

  const current = Math.round(data.current.temp);
</script>

<div>
  <p>It's currently</p>
  <p class="big-number">{current.toString() + "ºC"}</p>
</div>

<style>
  div {
    text-align: left;
    margin-bottom: 1em;
  }
  .big-number {
    font-size: 6rem;
    font-family: "IBM Plex Mono";
    font-weight: bold;
    color: aquamarine;
    text-align: left;
    margin-top: 30px;
  }
</style>

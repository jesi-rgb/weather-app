<script>
  export let data;

  const current = Math.round(data.current.temp);
</script>

<div class="bg-teal-900 rounded-lg p-5">
  <p class="text-left text-xl">It's currently</p>
  <p class="text-8xl text-left font-bold font-digits text-teal-100">
    {current.toString() + "ºC"}
  </p>
</div>

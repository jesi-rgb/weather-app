<script>
  import { cityData } from "./store";
  export let data;
  export let cityName;

  import { iconMapping } from "./variables";
  const current = Math.round(data.current.temp);

  let prefix = "wi wi-";
  let code = data.current.weather[0].id;
  let description = data.current.weather[0].description;
  let icon = iconMapping[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  // Finally tack on the prefix.
  icon = " " + prefix + icon;
  console.log($cityData);
</script>

<div class="bg-teal-900 rounded-lg p-5 px-7">
  <p class="text-left text-3xl text-teal-100 font-bold">{cityName}</p>
  <div class="flex flex-row items-end">
    <p class="text-8xl text-left font-bold font-digits text-teal-100 w-1/2">
      {current.toString() + "ºC"}
    </p>

    <div class="w-1/2 text-right">
      <i class={"text-6xl text-teal-100 mb-2" + icon} />
      <div class="font-text text-md text-teal-100">
        {description.toUpperCase()}
      </div>
    </div>
  </div>
</div>

<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw } from "svelte/transition";
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, curveBasis, curveCardinal } from "d3-shape";

  const width = 500,
    height = 220;
  const margin = { top: 20, right: 20, bottom: 20, left: 180 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xTicks = data.daily.map((d) => new Date(d.dt).getDay());

  // scales
  const xScale = scaleTime()
    .domain(extent(data.daily.map((d) => d.dt)))
    .range([5, 95]);

  const yScale = scaleLinear()
    .domain(extent(data.daily.map((d) => d.temp.day)))
    .range([20, 40]);

  // the path generator
  const pathLine = line()
    .x((d) => xScale(d.dt))
    .y((d) => yScale(d.temp.day))
    .curve(curveCardinal);
  console.log(xScale.ticks().map((t) => t.getDay()));
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.bottom})`}>
    {#each xScale.ticks() as tickValue}
      <g transform={`translate(${xScale(tickValue)},0)`}>
        <line
          y2={innerHeight}
          stroke="white"
          stroke-opacity=".2"
          stroke-width="1px"
        />
        <text
          text-anchor="middle"
          style="color:white"
          dy=".91em"
          y={innerHeight + 3}
        >
          {tickValue.getDay()}
        </text>
      </g>
    {/each}
    <path transition:draw={{ duration: 1000 }} d={pathLine(data.daily)} />
  </g>
</svg>

<style>
  path {
    stroke: lightgreen;
    stroke-width: 1;
    fill: none;
    stroke-linecap: round;
  }
  text {
    color: white;
  }
</style>

<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw } from "svelte/transition";
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import { axisBottom, axisLeft } from "d3-axis";

  const width = 500,
    height = 220;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // scales
  const xScale = scaleTime()
    .domain(extent(data.daily.map((d) => new Date(d.dt * 1000))))
    .range([0, innerWidth]); // range in pixel coordinates

  const yScale = scaleLinear()
    .domain(extent(data.daily.map((d) => d.temp.day)))
    .range([innerHeight, 0])
    .interpolate(interpolateRound);

  // the path generator
  const pathLine = line()
    .x((d) => xScale(d.dt * 1000))
    .y((d) => yScale(d.temp.day))
    .curve(curveBasis);
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.bottom})`}>
    <g transform={`translate(0, ${height})`}> {axisBottom(xScale)} </g>
    {#each xScale.ticks() as tickValue}
      <g transform={`translate(${xScale(tickValue)},0)`}>
        <line
          y2={innerHeight}
          stroke="white"
          stroke-opacity=".2"
          stroke-width="1px"
          stroke-dasharray="2 10"
        />
        <text text-anchor="middle" dy=".21em" y={innerHeight}>
          {new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(
            tickValue
          )}
        </text>
      </g>
    {/each}
    {#each yScale.ticks() as yTickValue}
      <g transform={`translate(0,${yScale(yTickValue)})`}>
        <line
          x2={innerWidth}
          stroke="white"
          stroke-opacity=".2"
          stroke-width="1px"
        />
        <text text-anchor="middle" y={3}>
          {yTickValue}
        </text>
      </g>
    {/each}
    <path transition:draw={{ duration: 1000 }} d={pathLine(data.daily)} />
  </g>
</svg>

<style>
  path {
    stroke: lightgreen;
    stroke-width: 3;
    fill: none;
    stroke-linecap: round;
  }
  text {
    fill: rgb(172, 172, 172);
    font-family: Inter;
    font-size: 7px;
  }
</style>

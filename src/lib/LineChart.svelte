<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw } from "svelte/transition";
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

  const width = 550,
    height = 220;
  const margin = { top: 20, right: 20, bottom: 20, left: 50 };
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
    <Axis {innerHeight} {margin} scale={xScale} position="bottom" />
    <Axis {innerHeight} {margin} scale={yScale} position="left" />

    {#each yScale.ticks() as yTickValue}
      <g transform={`translate(0,${yScale(yTickValue)})`}>
        <line
          x2={innerWidth}
          stroke="white"
          stroke-opacity=".2"
          stroke-width="1px"
        />
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
</style>

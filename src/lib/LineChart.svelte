<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw, fade } from "svelte/transition";
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, area, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

  const width = window.innerWidth - 100,
    height = 380;
  const margin = { top: 30, right: 60, bottom: 10, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // scales
  const xScale = scaleTime()
    .domain(extent(data.hourly.map((d) => new Date(d.dt * 1000))))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data.hourly.map((d) => d.temp)))
    .range([innerHeight, 0])
    .nice()
    .interpolate(interpolateRound);

  // the path generator
  const pathLine = line()
    .x((d) => xScale(d.dt * 1000))
    .y((d) => yScale(d.temp))
    .curve(curveBasis);

  const colorArea = area()
    .x((d) => xScale(d.dt * 1000))
    .y0(yScale(extent(data.hourly.map((d) => d.temp))[0]))
    .y1((d) => yScale(d.temp))
    .curve(curveBasis);
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.bottom})`}>
    <!-- x axis -->
    <Axis
      {innerHeight}
      tickNumber={24}
      {margin}
      scale={xScale}
      position="bottom"
    />

    <!-- y axis -->
    <Axis
      {innerHeight}
      tickNumber={4}
      {margin}
      scale={yScale}
      position="left"
    />

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
    <path transition:draw={{ duration: 1000 }} d={pathLine(data.hourly)} />
    <path
      transition:fade={{ duration: 600, delay: 800 }}
      class="path-area"
      d={colorArea(data.hourly)}
    />
  </g>
</svg>

<style>
  path {
    stroke: aquamarine;
    stroke-width: 3;
    fill: none;
    stroke-linecap: round;
  }
  .path-area {
    fill: aquamarine;
    fill-opacity: 0.1;
    stroke-width: 0;
  }
</style>

<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw, fade } from "svelte/transition";
  import { extent, bisector } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, area, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

  const hours = data.hourly;

  const width = window.innerWidth - 100,
    height = 100;
  const margin = { top: 30, right: 0, bottom: 10, left: 30 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const padExtent = function (values, pad = 2) {
    let ext = extent(values);
    return [ext[0] - pad, ext[1] + pad];
  };
  // scales
  const xScale = scaleTime()
    .domain(extent(hours.map((d) => new Date(d.dt * 1000))))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(
      padExtent(
        hours.map((d) => d.temp),
        1
      ).map((d) => Math.round(d))
    )
    .range([innerHeight, 0])
    .interpolate(interpolateRound);

  // the path generator
  const pathLine = line()
    .x((d) => xScale(d.dt * 1000))
    .y((d) => yScale(d.temp))
    .curve(curveBasis);

  const colorArea = area()
    .x((d) => xScale(d.dt * 1000))
    .y0(yScale(yScale.invert(innerHeight)))
    .y1((d) => yScale(d.temp))
    .curve(curveBasis);

  const bisect = bisector(function (d) {
    return new Date(d.dt * 1000);
  }).left;

  const xTicks = xScale.ticks();
  const temps = xTicks.map((xt) => hours[bisect(hours, xt)].temp);
  const tickAndTemps = xTicks.map((tick, i) => [tick, temps[i]]);
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.bottom})`}>
    <!-- x axis -->
    <Axis
      {innerHeight}
      tickNumber={6}
      {margin}
      scale={xScale}
      position="bottom"
    />

    <!-- y axis -->
    <Axis
      {innerHeight}
      tickNumber={2}
      {margin}
      scale={yScale}
      position="left"
    />

    {#each tickAndTemps as tickAndTemp}
      <g transform={`translate(${xScale(tickAndTemp[0])}, 0)`} />
      <text
        text-anchor="middle"
        fill="aquamarine"
        font-family="IBM Plex Mono"
        font-size="12px"
        opacity=".5"
        dy="-10px"
        x={xScale(tickAndTemp[0])}
        y={yScale(tickAndTemp[1])}
        >{Math.round(tickAndTemp[1]).toString() + "ºC"}</text
      >
    {/each}
    <path transition:draw={{ duration: 1000 }} d={pathLine(hours)} />
    <path
      transition:fade={{ duration: 600, delay: 800 }}
      class="path-area"
      d={colorArea(hours)}
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

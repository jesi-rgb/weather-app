<!-- svelte-ignore component-name-lowercase -->
<script>
  export let data;

  import { draw, fade } from "svelte/transition";
  import { select } from "d3-selection";
  import { extent, bisector, max } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, area, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

  const hours = data.hourly;
  const timeOffset = data.timezone_offset;

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
    .domain(extent(hours.map((d) => new Date(d.dt * 1000 + timeOffset))))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(
      padExtent(
        hours.map((d) => d.temp),
        5
      ).map((d) => Math.round(d))
    )
    .range([innerHeight, 0])
    .interpolate(interpolateRound);

  // the path generator
  const pathLine = line()
    .x((d) => xScale(d.dt * 1000 + timeOffset))
    .y((d) => yScale(d.temp))
    .curve(curveBasis);

  const colorArea = area()
    .x((d) => xScale(d.dt * 1000 + timeOffset))
    .y0(yScale(yScale.invert(innerHeight)))
    .y1((d) => yScale(d.temp))
    .curve(curveBasis);

  const bisect = bisector(function (d) {
    return new Date(d.dt * 1000 + timeOffset);
  }).left;

  const xTicks = xScale.ticks(6);
  const temps = xTicks.map((xt) => hours[bisect(hours, xt)].temp);
  const tickAndTemps = xTicks.map((tick, i) => [tick, temps[i]]);

  let defs;

  $: {
    select(defs)
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#5eead4" },
        // add additional steps as needed for gradient.
        { offset: "60%", color: "#24242400" },
      ])
      .enter()
      .append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });
  }
</script>

<svg {width} {height}>
  <defs bind:this={defs} />
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

    <path
      transition:fade={{ duration: 600, delay: 800 }}
      class="path-area"
      id="area"
      d={colorArea(hours)}
    />
    <path
      transition:draw={{ duration: 1000, delay: 300 }}
      d={pathLine(hours)}
    />
    {#each tickAndTemps as tickAndTemp}
      <g transform={`translate(${xScale(tickAndTemp[0])}, 0)`} />
      <text
        text-anchor="middle"
        font-size="12px"
        class="fill-teal-200 font-digits opacity-80"
        dy="-10px"
        x={xScale(tickAndTemp[0])}
        y={yScale(tickAndTemp[1])}
        transition:fade={{ duration: 600, delay: 800 }}
        >{Math.round(tickAndTemp[1]).toString() + "ºC"}</text
      >
      <circle
        cx={xScale(tickAndTemp[0])}
        cy={yScale(tickAndTemp[1])}
        r="4"
        fill="#5eead4"
        transition:fade={{ duration: 600, delay: 800 }}
      />
    {/each}
  </g>
</svg>

<style>
  path {
    @apply stroke-teal-300;
    stroke-width: 3;
    fill: none;
    stroke-linecap: round;
  }
  .path-area {
    fill: url(#area-gradient);
    stroke-width: 0;
  }
</style>

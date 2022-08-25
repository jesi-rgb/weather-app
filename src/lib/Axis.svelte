<script>
  import { select, selectAll } from "d3-selection";
  import { axisBottom, axisLeft } from "d3-axis";
  import { timeFormat } from "d3-time-format";

  export let innerHeight;
  export let margin;
  export let position;
  export let scale;
  export let tickNumber = 5;

  let transform;
  let g;

  $: {
    select(g).selectAll("*").remove();

    let axis;
    switch (position) {
      case "bottom":
        axis = axisBottom(scale)
          .ticks(tickNumber)
          .tickFormat((d) => timeFormat("%H")(d).toString() + "h")
          .tickSizeOuter(0);
        transform = `translate(0, ${innerHeight})`;
        break;
      case "left":
        axis = axisLeft(scale).ticks(tickNumber).tickSizeOuter(0);
        transform = `translate(${margin}, 0)`;
    }

    select(g).call(axis);
    select(g).style("font-size", "12px");
    select(g).style("font-family", "IBM Plex Mono");
    select(g).style("color", "rgb(132, 132, 132)");
    select(g).select("path").style("opacity", "0");
    select(g).selectAll("line").style("opacity", "0");
  }
</script>

<g class="axis" bind:this={g} {transform} />

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: number = 50;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let testId: string = "";

  const dispatch = createEventDispatcher<{ input: number }>();

  let sliderRef: HTMLDivElement;

  function updateValue(clientX: number) {
    const rect = sliderRef.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    value = Math.round((min + (max - min) * percentage) / step) * step;
    value = Math.max(min, Math.min(max, value));
    dispatch("input", value);
  }

  function handleMove(event: MouseEvent | TouchEvent) {
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    updateValue(clientX);
  }

  $: fillWidth = `${((value - min) / (max - min)) * 100}%`;
</script>

<div
  bind:this={sliderRef}
  data-testid={testId}
  class="relative h-2 bg-zinc-50 rounded-full cursor-pointer"
  on:mousedown={handleMove}
  on:touchstart|preventDefault={handleMove}
  on:mousemove={(event) => event.buttons && handleMove(event)}
  on:touchmove|preventDefault={handleMove}
>
  <div
    class="absolute h-full bg-blue-500 rounded-full"
    style="width: {fillWidth};"
  ></div>
  <div
    class="absolute w-4 h-4 bg-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
    style="left: {fillWidth}; top: 50%;"
  ></div>
</div>

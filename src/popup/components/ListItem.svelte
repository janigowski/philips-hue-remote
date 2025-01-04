<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let name = "";
  export let icon = "";
  export let on = false;
  export let brightness = 0;

  const dispatch = createEventDispatcher();

  function onToggle(event: Event) {
    const target = event.target as HTMLInputElement;

    dispatch("toggle", { checked: target.checked });
  }

  function onBrightnessChange(event: Event) {
    const target = event.target as HTMLInputElement;

    dispatch("brightnessChange", {
      value: Number(target.value),
    });
  }
</script>

<div class="list-item">
  <span data-testid="icon">{icon}</span>
  <span>{name}</span>

  <input
    data-testid="on-toggle"
    type="checkbox"
    bind:checked={on}
    on:change={onToggle}
  />
  <label for="on-toggle">Turn on</label>

  <input
    data-testid="brightness"
    type="range"
    bind:value={brightness}
    min={0}
    max={100}
    step={0.001}
    on:input={onBrightnessChange}
  />
</div>

<style>
</style>

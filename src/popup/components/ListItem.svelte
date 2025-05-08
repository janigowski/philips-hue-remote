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

<div class="list-item card flex items-center gap-4 mb-4">
  <span data-testid="icon" class="text-2xl">{icon}</span>
  <span class="flex-1 font-medium">{name}</span>

  <input
    data-testid="on-toggle"
    type="checkbox"
    bind:checked={on}
    on:change={onToggle}
    class="w-5 h-5 rounded border border-[#23272F] focus:ring-2 focus:ring-accent"
  />
  <label for="on-toggle" class="ml-2 text-sm">Turn on</label>

  <input
    data-testid="brightness"
    type="range"
    bind:value={brightness}
    min={0}
    max={100}
    step={0.001}
    on:input={onBrightnessChange}
    class="w-32 h-2 rounded-full bg-[#23272F] accent-accent"
  />
</div>

<style>
</style>

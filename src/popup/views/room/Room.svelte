<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Rooms from "./components/Rooms.svelte";
  import Slider from "../../../components/Slider.svelte";
  import { pop } from "svelte-spa-router";
  import { app } from "../../app";

  const id = "qwerty-123";
  const room = app.room(id);
  const { name, scenes, lights, changeBrightness } = room;

  let on = true;
  let brightness = 0.5;

  const dispatch = createEventDispatcher();

  function onToggle(event: Event) {
    const target = event.target as HTMLInputElement;

    dispatch("toggle", { checked: target.checked });
  }

  function onBrightnessChange(event: Event) {
    const target = event.target as HTMLInputElement;

    changeBrightness(Number(target.value));
  }

  function onGoBackClick() {
    pop();
  }
</script>

<div>
  <div>
    <a on:click={onGoBackClick}>&lt;</a>
    <h1>{$name}</h1>
    <input
      data-testid="on-toggle"
      type="checkbox"
      bind:checked={on}
      on:change={onToggle}
    />
  </div>

  <input
    data-testid="brightness"
    type="range"
    bind:value={brightness}
    min={0}
    max={100}
    step={0.001}
    on:input={onBrightnessChange}
  />

  <div>
    <h2>Scenes</h2>
    <div>
      {#each $scenes as scene}
        <span>{scene.name}</span>
      {/each}
    </div>
  </div>

  <div>
    <h2>Lights</h2>
    <div>
      {#each $lights as light}
        <span>{light.name}</span>
      {/each}
    </div>
  </div>
</div>

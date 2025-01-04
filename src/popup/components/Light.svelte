<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let name = "";
  export let icon = "";

  export let on = false;

  const dispatch = createEventDispatcher();

  function onToggle(event: Event) {
    const target = event.target as HTMLInputElement;

    dispatch("toggle", { checked: target.checked });
  }
</script>

<button on:click>
  <span>{icon}</span>
  <span>
    {name}
  </span>
  <input
    data-testid="on-toggle"
    type="checkbox"
    bind:checked={on}
    on:change={onToggle}
  />
</button>

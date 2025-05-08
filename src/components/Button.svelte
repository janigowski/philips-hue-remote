<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let ariaLabel: string = "";
  export let className: string = "";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button
  {type}
  class={`btn-modern ${className}`}
  {disabled}
  aria-label={ariaLabel}
  on:click={(e) => !disabled && dispatch("click", e)}
>
  <slot />
</button>

<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<nav class="flex gap-2 mt-6">
  <a href="/home" use:link use:active class="btn-modern">Home</a>
  <a href="/link-bridge" use:link use:active class="btn-modern">Link Bridge</a>
  <a href="/remote" use:link use:active class="btn-modern">Remote</a>
  <a href="/settings/connection" use:link use:active class="btn-modern"
    >Settings</a
  >
</nav>

<style>
  :global(a.active) {
    color: #4f8cff;
    border-color: #4f8cff;
    box-shadow: 0 0 0 2px #4f8cff33;
  }
</style>

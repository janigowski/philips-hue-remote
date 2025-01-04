<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<a href="/home" use:link use:active>Home</a>
<a href="/link-bridge" use:link use:active>Link Bridge</a>
<a href="/remote" use:link use:active>Remote</a>
<a href="/settings/connection" use:link use:active>Settings</a>

<style>
  a {
    text-decoration: none;
    color: #fff;
  }

  :global(a.active) {
    color: lime;
  }
</style>

<script>
  import "../app.css";
  import Router from "./Router.svelte";
</script>

<div class="popup card w-[500px] h-[700px] p-6 overflow-scroll">
  <Router />
</div>

<style>
  :global(body) {
    margin: 0;
  }
</style>

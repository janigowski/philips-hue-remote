<script>
  import "../app.css";
  import Router from "./Router.svelte";
  import Menu from "./components/Menu.svelte";
</script>

<div class="popup">
  <Router />
  <Menu />
</div>

<style>
  .popup {
    width: 500px;
    height: 2000px;
    background: #1b1a1a;
    color: #fff;
    padding: 20px;
    overflow: scroll;
  }

  :global(body) {
    margin: 0;
  }
</style>

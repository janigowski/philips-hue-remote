<script>
  import { fade } from "svelte/transition";
  import { app, hueClient } from "../app";

  async function openHttpsConfirmationPage() {
    await app.getBridgeIp();

    // @TODO: open new page with bridge IP addres to allow adding to "unsafe"
  }
</script>

<div in:fade>
  <h2>Allow HTTPS</h2>
  <button on:click={openHttpsConfirmationPage}>Open HTTPS Page</button>
</div>

<style>
</style>

<script>
  import { app, hueClient } from "../app";
  import Button from "../../components/Button.svelte";

  async function discoverBridgeClicked() {
    const bridge = await hueClient.discover();
    if (bridge instanceof Error) {
      console.error(bridge.message);
      return;
    }
    await app.saveBridgeIp(bridge.ip);
  }

  async function bridgeButtonClicked() {
    const result = await hueClient.createApp();
    if (result instanceof Error) {
      console.error(result.message);
      return;
    }
    await app.saveAppKey(result.username);
  }

  async function logKeyClicked() {
    console.log(await app.getAppKey());
  }
</script>

<div class="popup">
  Connecting to Hue Bridge Press the link button in the center of the bridge and
  then the button below.

  <Button on:click={discoverBridgeClicked} className="mb-2"
    >Discover Bridge</Button
  >
  <Button on:click={bridgeButtonClicked} className="mb-2"
    >Bridge Button clicked</Button
  >
  <Button on:click={logKeyClicked} className="mb-2">Log Key</Button>
</div>

<style>
</style>

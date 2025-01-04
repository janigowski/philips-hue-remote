<script>
  import { app, hueClient } from "../app";

  async function discoverBridgeClicked() {
    const bridge = await hueClient.discover();

    await app.saveBridgeIp(bridge.ip);
  }

  async function bridgeButtonClicked() {
    const result = await hueClient.createApp();

    await app.saveAppKey(result.username);
  }

  async function logKeyClicked() {
    console.log(await app.getAppKey());
  }
</script>

<div class="popup">
  Connecting to Hue Bridge Press the link button in the center of the bridge and
  then the button below.

  <button on:click={discoverBridgeClicked}>Discover Bridge</button>
  <button on:click={bridgeButtonClicked}>Bridge Button clicked</button>
  <button on:click={logKeyClicked}>Log Key</button>
</div>

<style>
</style>

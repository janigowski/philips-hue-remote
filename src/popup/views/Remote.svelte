<script>
  import { fade } from "svelte/transition";
  import { hueClient } from "../app";
  import ColorWheel from "../components/ColorWheel.svelte";

  async function getDevices() {
    console.log("devices", await hueClient.getDevices());
  }

  async function turnOffDeskLamp() {
    hueClient.turnOffDeskLamp();
  }

  async function turnOnDeskLamp() {
    hueClient.turnOnDeskLamp();
  }

  async function logItself() {
    hueClient.logItself();
  }
</script>

<div in:fade>
  <h2>Remote</h2>
  <button on:click={getDevices}>Get Devices</button>
  <button on:click={logItself}>Log Hue</button>

  <button on:click={turnOffDeskLamp}>Turn Off Desk Lamp</button>
  <button on:click={turnOnDeskLamp}>Turn On Desk Lamp</button>

  <ColorWheel />
</div>

<style>
</style>

<script>
  import { fade } from "svelte/transition";
  import { hueClient } from "../app";
  import ColorWheel from "../components/ColorWheel.svelte";
  import Layout from "../components/Layout.svelte";
  import Button from "../../components/Button.svelte";

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

<Layout>
  <div in:fade>
    <h2 class="text-xl font-bold mb-4">Remote</h2>
    <Button on:click={getDevices} className="mb-2">Get Devices</Button>
    <Button on:click={logItself} className="mb-2">Log Hue</Button>
    <Button on:click={turnOffDeskLamp} className="mb-2"
      >Turn Off Desk Lamp</Button
    >
    <Button on:click={turnOnDeskLamp} className="mb-2">Turn On Desk Lamp</Button
    >
    <ColorWheel />
  </div>
</Layout>

<style>
</style>

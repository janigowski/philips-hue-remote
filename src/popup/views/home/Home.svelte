<script lang="ts">
  import { onMount } from "svelte";
  import Rooms from "./components/Rooms.svelte";
  import { app } from "../../app";

  const rooms = app.bridge?.XXrooms;
</script>

<div class="home">
  <Rooms
    rooms={$rooms}
    onBrightnessChange={(roomId, value) => {
      // const bridge = app.bridge;
      // if (bridge) {
      //   const room = bridge.rooms.ofId(roomId);
      //   if (room) {
      //     room.brightness.set(value);
      //   }
      // }
    }}
  />
</div>

<style>
</style>

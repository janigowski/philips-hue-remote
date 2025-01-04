<script lang="ts">
  import type { Room } from "../../../interfaces";
  import RooomItem from "./RooomItem.svelte";

  export let rooms: Room[] = [];
  export let onRoomToggle = (roomId: string): void => {};
  export let onBrightnessChange = (roomId: string, value: number): void => {};
</script>

<div class="home">
  <div>Rooms</div>

  <div class="rooms">
    {#each rooms as room (room.id)}
      <RooomItem {room} {onRoomToggle} {onBrightnessChange} />
    {/each}
  </div>
</div>

<style>
</style>

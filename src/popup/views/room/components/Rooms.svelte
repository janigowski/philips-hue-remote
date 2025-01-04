<script lang="ts">
  import ListItem from "../../../components/ListItem.svelte";
  import type { Room } from "../../../interfaces";
  import RooomItem from "./RooomItem.svelte";

  export let rooms: Room[] = [];
  export let onRoomToggle = (roomId: string): void => {};
  export let onBrightnessChange = (roomId: string, value: number): void => {};

  let name = "Living Room";
</script>

<div class="home">
  <div>{name}</div>

  <div class="rooms">
    {#each rooms as room (room.id)}
      <RooomItem {room} {onRoomToggle} {onBrightnessChange} />
    {/each}
  </div>
</div>

<style>
</style>

<script lang="ts">
  import ListItem from "../../../components/ListItem.svelte";
  import type { Room } from "../../../interfaces";
  import { tweened } from "svelte/motion";
  import { get } from "svelte/store";

  export let room: Room;
  export let onRoomToggle = (roomId: string) => {};
  export let onBrightnessChange = (roomId: string, value: number) => {};

  const { name, on, brightness } = room;
  const tweenDurationMs = 300;
  const tweenedBrightness = tweened(get(brightness), {
    duration: tweenDurationMs,
  });

  $: {
    tweenedBrightness.set($brightness);
  }
</script>

<ListItem
  name={$name}
  on={$on}
  brightness={$tweenedBrightness}
  on:toggle={() => {
    onRoomToggle(room.id);
  }}
  on:brightnessChange={(event) => {
    onBrightnessChange(room.id, event.detail.value);
  }}
/>

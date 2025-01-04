<script>
  import iro from "@jaames/iro";
  import { onMount } from "svelte";
  import { hueClient } from "../app";

  let wheelPicker;

  async function onColorChange(color) {
    await hueClient.setColorOnDeskLamp(color.red, color.green, color.blue);
  }

  onMount(() => {
    wheelPicker = new iro.ColorPicker("#wheel", {
      width: 250,
      color: "rgb(255, 0, 0)",
      borderWidth: 1,
      borderColor: "#fff",
      layout: [
        {
          component: iro.ui.Wheel,
        },
      ],
    });

    wheelPicker.on("color:change", onColorChange);

    return () => {
      wheelPicker.off("color:change", onColorChange);
    };
  });
</script>

<div id="wheel"></div>

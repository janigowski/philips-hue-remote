<script>
  import Router, { push } from "svelte-spa-router";

  import { app } from "./app";
  import Loading from "./views/Loading.svelte";
  import Home from "./views/home/Home.svelte";
  import LinkBridge from "./views/LinkBridge.svelte";
  import Remote from "./views/Remote.svelte";
  import Settings from "./views/Settings.svelte";

  const { status } = app;

  $: {
    switch ($status) {
      case "installed":
        push("/home");

        break;

      case "loading": {
        push("/loading");
      }
    }
  }

  const routes = {
    "/loading": Loading,
    "/home": Home,
    "/link-bridge": LinkBridge,
    "/remote": Remote,
    "/settings/*": Settings,
  };
</script>

<Router {routes} />

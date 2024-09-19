import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import "./index.css";
import router from "./router";
import Aura from "@/presets/aura";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura,
});

app.mount("#app");

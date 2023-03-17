import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import WujieVue from "wujie-vue3";
import antdIcons from "@/plugins/antd-icons";
import { useLifecycle } from "@/composables/lifecycle";

const app = createApp(App);
const pinia = createPinia();
pinia.use(
  createPersistedState({
    key: (storeKey) => `workbench-${storeKey}`,
  })
);

app.use(pinia);
app.use(router);
app.use(WujieVue);
app.use(antdIcons);

app.mount("#app");

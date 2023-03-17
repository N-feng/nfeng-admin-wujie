import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

function renderDom() {
  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(
    createPersistedState({
      key: (storeKey) => `workbench-${storeKey}`,
    })
  );
  app.use(pinia);
  app.use(router);
  app.mount("#app");

  return app;
}

if (window.__POWERED_BY_WUJIE__) {
  const { bus } = window.$wujie;
  bus.$on("vite:navigate", (fullPath: string) => {
    const path = fullPath.replace("/external", "");
    if (path !== router.currentRoute.value.fullPath) {
      router.push(path);
    }
  });
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = renderDom();
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount();
} else {
  renderDom();
}

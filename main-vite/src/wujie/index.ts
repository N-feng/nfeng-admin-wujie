import WujieVue from "wujie-vue3";
import hostMap from "@/wujie/hostMap";
import lifecycles from "./lifecycle";
import credentialsFetch from "@/wujie/fetch";
import { type Router } from "vue-router";

export function initWujie(apps: string[], router: Router) {
  const isProduction = process.env.NODE_ENV === "production";
  const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

  const degrade =
    window.localStorage.getItem("degrade") === "true" ||
    !window.Proxy ||
    !window.CustomElementRegistry;
  const props = {
    jump: (name: any) => {
      router.push({ name });
    },
  };

  /**
   * 大部分业务无需设置 attrs
   * 此处修正 iframe 的 src，是防止github pages csp报错
   * 因为默认是只有 host+port，没有携带路径
   */
  const attrs = isProduction ? { src: hostMap("//localhost:8000/") } : {};
  /**
   * 配置应用，主要是设置默认配置
   * preloadApp、startApp的配置会基于这个配置做覆盖
   */
  apps.forEach((app) =>
    setupApp({
      name: app,
      url: hostMap(app),
      attrs,
      exec: true,
      props,
      fetch: credentialsFetch,
      degrade,
      ...lifecycles,
    })
  );

  if (window.localStorage.getItem("preload") !== "false") {
    // 预加载所有子应用
    apps.forEach((app) =>
      WujieVue.preloadApp({
        name: app,
        url: `/${app}/blank`,
        exec: true,
      })
    );
  }
}

import { useMenuStore } from "@/stores/menu";
import { initWujie } from "@/wujie";

export function useLifecycle() {
  // 项目启动后
  function onLaunch() {
    const router = useRouter();
    const { systemMenus } = useMenuStore();
    const apps = systemMenus.map((i) => i.baseUrl.split("/").slice(1)[1]);
    // initWujie(apps, router);
  }

  return { onLaunch };
}

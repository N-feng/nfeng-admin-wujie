export const useSystemStore = defineStore(
  'system',
  () => {
    const refresh = false // 刷新菜单tab
    const keepAliveComponents: any = []
    return {
      refresh,
      keepAliveComponents
    }
  },
  { persist: true }
)
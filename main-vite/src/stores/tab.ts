export const useTabStore = defineStore(
  'tab',
  () => {
    const activeKey = ref<string>('')

    return {
      activeKey,
    }
  },
  { persist: true }
)
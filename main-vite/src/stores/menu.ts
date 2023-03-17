import { ISystemMenu } from '@/typings/menu'

export const useMenuStore = defineStore(
  'menu',
  () => {
    const systemMenus = ref<ISystemMenu[]>([
      {
        tenementId: 1,
        name: 'vite',
        baseUrl: '/app/vite/home',
        menuList: []
      }
    ])
    const headerSelectedKeys = ref(['/vite'])

    return {
      systemMenus,
      headerSelectedKeys,
    }
  },
  { persist: true },
)
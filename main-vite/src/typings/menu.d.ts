export interface IMenu {
  url: string
  icon: string
  level: number
  menuCode: string
  menuName: string
  menus: IMenu[]
}

export interface ISystemMenu {
  tenementId: number
  name: string
  baseUrl: string
  menuList: IMenu[]
  redirectUrl?: string
}
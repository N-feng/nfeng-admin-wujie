import type { App } from 'vue'

export default function (app: App<Element>) {
  const modules = import.meta.glob(
    `/node_modules/@ant-design/icons-vue/es/icons/*.js`,
  )

  for (const path in modules) {
    const [name] = path.match(/[^/]+(?=\.js$)/) as RegExpMatchArray
    app.component(name, defineAsyncComponent(modules[path] as any))
  }
}

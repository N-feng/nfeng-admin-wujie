export function uResolve(path = '') {
  const result = path.replace(/^\/(shortcut|app)\//, '/').match(/\/[^/?#]+/g)
  if (result) {
    return {
      app: result[0].slice(1),
      path: result.join(''),
      subPaths: result.reduce((r, p) => {
        const [last] = r.slice(-1)
        if (last) {
          r.push(`${last}${p}`)
        } else {
          r.push(p)
        }
        return r
      }, [] as string[]),
    }
  }
  return { app: '', path: '', subPaths: [] }
}
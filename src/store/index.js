const imports = import.meta.glob(["./**.js", "!./index.js"], {
    eager: true
})
let map = {}

for (const moduleName of Object.keys(imports)) {
    let name = moduleName.match(/\/(.*?)\.\w+$/)[1]
    let object = imports[moduleName]?.default
    map[name + "Store"] = object
}
export default map

export function StoreToSession (name, jsonToSave) {
  window.sessionStorage.setItem(name, JSON.stringify(jsonToSave))
}

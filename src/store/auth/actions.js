export function checkPermission ({ state }, data) {
  return state.user.permissions.includes(data)
}

export function setIsLogged (state, isLogged) {
  state.isLogged = isLogged
}

export function setUser (state, user) {
  state.user = user
}

export function setPermission (state, permission) {
  state.user.permissions.push(permission)
}

export function deletePermission (state, permission) {
  state.user.permissions.splice(state.user.permissions.indexOf(permission), 1)
}

export function setTokenData (state, tokenData) {
  state.tokenData = tokenData
}

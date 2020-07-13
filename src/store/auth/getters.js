export function getUser (state) {
  return state.user
}

export function getPermissions (state) {
  return state.user.permissions || []
}

export function getTokenData (state) {
  return state.tokenData
}

export function checkIsLogged (state) {
  return state.isLogged
}

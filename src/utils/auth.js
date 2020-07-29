import store from '../store/index'

export function getUser() {
  let store_user = store.state.user.user
  let session_user = sessionStorage.getItem('user')

  // 是否存在于 Vuex
  if (store_user) {
    return store_user
  }
  // 是否存在于 sessionStorage
  if (session_user) {
    store.commit('MT_UPDATE_USER', JSON.parse(session_user))
    return JSON.parse(session_user)
  }

  return null
}
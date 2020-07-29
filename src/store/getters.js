const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.user.name
}
export default getters

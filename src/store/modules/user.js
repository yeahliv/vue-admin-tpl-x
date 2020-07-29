export default {
  state: {
    user: null,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
  },
  mutations: {
    MT_UPDATE_USER(state, value) {
      state.user = value
    }
  },
  actions: {},
  getters: {
    user: state => state.user
  }
}
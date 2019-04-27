import Cookies from 'js-cookie'

const state = {
  info: {
  }
}

const mutations = {
  logout(state) {
    Cookies.remove('user')
    Cookies.remove('password')
  }
}

export default {
  state,
  mutations
}

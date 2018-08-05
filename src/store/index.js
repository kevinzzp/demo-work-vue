import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const FrameConst = {
  M_MODAL_ALERT: 'M_MODAL_ALERT',
  M_XXPICKER: 'M_XXPICKER'

}
export default new Vuex.Store({
  state: {
    alert: {
      show: false,
      msg: '',
      title: '系统提示',
      btnText: '关闭'
    },
    picker: {
      show: false,
      slots: [],
    }
  },
  mutations: {
    [FrameConst.M_MODAL_ALERT]: (state, payload) => {
      state.alert = Object.assign(state.alert, payload)
    },
    [FrameConst.M_MODAL_ALERT]: (state, payload) => {
      state.picker = Object.assign(state.picker, payload)
    }
  },
  actions: {
    fAlert({
      commit
    }, payload) {
      commit(FrameConst.M_MODAL_ALERT, payload)
    },

    fToast({
      commit
    }, payload) {
      commit(FrameConst.M_XXPICKER, payload)
    },
  }
})
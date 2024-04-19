import { doc, onSnapshot } from 'firebase/firestore'

/******************************************************************
 * STATE
 ******************************************************************/
export const state = () => ({
  // Number of members.
  members: 0,
  listener: null,
})
/******************************************************************
 * GETTERS
 ******************************************************************/
export const getters = {
  members(state) {
    return state.members
  },
}
/******************************************************************
 * MUTATIONS
 ******************************************************************/
export const mutations = {
  setMembers(state, payload) {
    state.members = payload
  },
  setListener(state, listener) {
    state.listener = listener
  },
  removeListener(state) {
    if (state.listener) state.listener()
    state.listener = null
    state.members = 0
  },
}
/******************************************************************
 * ACTIONS
 ******************************************************************/
export const actions = {
  subscribe({ commit }) {
    const docRef = doc(this.$firestore, 'settings/system')
    const listener = onSnapshot(docRef, (doc) => {
      commit('setMembers', doc.data().members)
    })
    commit('setListener', listener)
    // eslint-disable-next-line
    console.info('[settings.js] Subscription of system has been started.')
  },
  unsubscribe({ commit }) {
    commit('removeListener')
    // eslint-disable-next-line
    console.info('[settings.js] Subscription of system has been unsubscribed.')
  },
}

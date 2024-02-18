import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      bookings: Object,
    }
  },
  getters: {
    getAllBookings(state) {
      return state.bookings
    },
    getOneBooking(state, payload) {
      return state.bookings.find((booking) => booking.id === payload)
    },
  },
  mutations: {
    setBookings(state, payload) {
      state.bookings = payload
    },
  },
})

export default store

<template>
  <div class="app">
    <CalendarDisplay></CalendarDisplay>
  </div>
</template>

<script>
import CalendarDisplay from './components/CalendarDisplay.vue';
import bookingsJson from './bookings.json';
import store from './store';

export default {
  name: 'App',
  store,
  components: {
    CalendarDisplay,
  },
  beforeCreate() {
    store.commit('setBookings', bookingsJson);
  },
};
</script>

<style>
body {
  margin: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 12px;
}
</style>

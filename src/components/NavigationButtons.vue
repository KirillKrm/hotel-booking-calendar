<template>
  <div class="nav">
    <button class="nav__button" @click="goToPrevWeek">{{ '<' }}</button>
        <button class="nav__button" @click="goToNextWeek">{{ '>' }}</button>
        <button class="nav__button" @click="goToCurrentWeek">{{ 'Today' }}</button>
  </div>
</template>

<script>
export default {
  name: 'NavigationButtons',
  props: {
    goToPrevWeek: {
      type: Function,
      required: true,
    },
    goToNextWeek: {
      type: Function,
      required: true,
    },
    goToCurrentWeek: {
      type: Function,
      required: true,
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  gap: 8px;
}

.nav__button {
  background-color: #1a2b47;
  color: white;
  border-radius: 4px;
  padding: 4px 16px;
}
</style>

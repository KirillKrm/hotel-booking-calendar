<template>
  <div class="popup" v-if="isVisible">
    <div class="popup__guest">
      <span class="guest__name">{{ name }}</span>
      <span>{{ phone }}</span>
      <span>{{ email }}</span>
    </div>
    <div class="popup__room">
      <span>{{ typeOfApartments }}</span>
      <b>Number of Guests: </b>
      <span>Adults: {{ guestInfo.adults }}</span>
      <span>Childrens: {{ guestInfo.children }}</span>
    </div>
    <button class="popup__close-button" @click="closePopup">Close</button>
  </div>
</template>

<script>
export default {
  name: 'ReservationPopup',
  props: {
    name: String,
    phone: String,
    email: String,
    typeOfApartments: String,
    guestInfo: { adults: Number, children: Number },
    isVisible: Boolean,
    closePopup: Function
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style scoped>
.popup {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50% - 200px;
  top: 100%;
  z-index: 1;
  min-width: 200px;
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.popup:hover {
  cursor: default;
}

.popup__guest {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.guest__name {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.popup__room {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 4px;
}

.popup__close-button {
  background-color: #1a2b47;
  color: white;
  border-radius: 4px;
  padding: 4px 16px;
}

.popup__close-button:hover {
  cursor: pointer;
}
</style>

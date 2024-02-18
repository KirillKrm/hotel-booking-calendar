<template>
  <div class="popup">
    <div class="popup__guest">
      <span class="guest__name">{{ 'Name Surname' }}</span>
      <span>{{ '000-000-0000' }}</span>
      <span>{{ 'surname@name.com' }}</span>
    </div>
    <div class="popup__room">
      <span>{{ 'roomType' }}</span>
      <b>Number of Guests:</b>
      <span>Adults: {{ }}</span>
      <span>Childrens: {{ }}</span>
    </div>
    <button class="popup__close-button">Close</button>
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
    guestInfo: { adults: Number, children: Number }
  }
};
</script>

<style scoped>
.popup {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
</style>

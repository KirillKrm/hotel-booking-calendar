<template>
  <div>
    <NavigationButtons :goToPrevWeek="setPrevWeek" :goToNextWeek="setNextWeek" :goToCurrentWeek="setCurrentWeek" />
    <table class="calendar">
      <thead>
        <tr>
          <th></th>
          <th v-for="(day, index) in dayNames" :key="index">{{ day }}</th>
        </tr>
        <tr>
          <th></th>
          <th v-for="(date, index) in currentWeek" :key="index">{{ date }}</th>
        </tr>
      </thead>
      <tbody class="calendar__body">
        <tr id="roomRow" :style="{ position: 'relative' }" v-for="(roomDetails, index) in roomDetails" :key="index">
          <th class="body__room">{{ roomDetails.name }}</th>
          <th v-for="(date, index) in currentWeek" :key="index"></th>

          <div v-for="booking in bookingsInWeekForRoom(roomDetails)" :key="booking.id">
            <div class="calendar__booking" :style="getBookingStyle(booking)">
              {{ booking.name }}
            </div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavigationButtons from './NavigationButtons.vue';
import store from '../store';
import { getMondayDate, isDateInRange, countDaysInRange, countDaysOffset, dateToString, moveDateByOffset } from '../utils/date-utils';

const cellWidth = 162;

export default {
  name: 'CalendarDisplay',
  components: { NavigationButtons },
  store,
  data() {
    const startDate = getMondayDate(new Date());
    const endDate = new Date().setDate(startDate.getDate() + 6);
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return {
      bookings: store.getters.getAllBookings,
      startWeekDate: startDate,
      endWeekDate: endDate,
      dayNames,
    };
  },
  computed: {
    roomDetails() {
      const stringifiedRoomDetails = this.bookings.map(({ roomDetails }) => JSON.stringify(roomDetails));
      const uniqueRawRoomDetails = new Set(stringifiedRoomDetails);
      return Array.from(uniqueRawRoomDetails).map((str) => JSON.parse(str));
    },
    currentWeek() {
      const dates = [];
      const currentDate = new Date(this.startWeekDate);

      while (currentDate <= this.endWeekDate) {
        dates.push(dateToString(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    },
  },
  methods: {
    bookingsInWeekForRoom(room) {
      const bookings = this.bookings.filter((booking) => {
        if (booking.roomDetails.id !== room.id || booking.roomDetails.name !== room.name) return false;

        const totalDaysInRange = countDaysInRange(this.startWeekDate, this.endWeekDate, booking.start, booking.end);
        return totalDaysInRange != 0;
      });

      return bookings;
    },
    getBookingStyle(booking) {
      let totalDaysInRange = countDaysInRange(this.startWeekDate, this.endWeekDate, booking.start, booking.end);

      let width = 0;
      let cellOffsetX = 0;
      let borderTopLeftRadius = '0px';
      let borderBottomLeftRadius = '0px';
      let borderTopRightRadius = '0px';
      let borderBottomRightRadius = '0px';
      const startCellOffset = cellWidth / 2;
      const endCellOffset = cellWidth / 2;

      if (isDateInRange(booking.start, this.startWeekDate, this.endWeekDate)) {
        borderTopLeftRadius = '20px';
        borderBottomLeftRadius = '20px';
        cellOffsetX = cellWidth * countDaysOffset(booking.start, this.startWeekDate) + startCellOffset;
        width += cellWidth - startCellOffset;
        totalDaysInRange -= 1;
      }

      if (isDateInRange(booking.end, this.startWeekDate, this.endWeekDate)) {
        borderTopRightRadius = '20px';
        borderBottomRightRadius = '20px';
        width += cellWidth - endCellOffset;
        // totalDaysInRange -= 1;
      }

      width += totalDaysInRange * cellWidth;

      return {
        width: `${width}px`,
        left: cellOffsetX + cellWidth + 'px',
        borderTopLeftRadius,
        borderBottomLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
      };
    },
    setPrevWeek() {
      this.startWeekDate = moveDateByOffset(this.startWeekDate, -7);
      this.endWeekDate = moveDateByOffset(this.endWeekDate, -7);
    },
    setNextWeek() {
      this.startWeekDate = moveDateByOffset(this.startWeekDate, 7);
      this.endWeekDate = moveDateByOffset(this.endWeekDate, 7);
    },
    setCurrentWeek() {
      this.startWeekDate = getMondayDate(new Date());
      this.endWeekDate = moveDateByOffset(this.startWeekDate, 6);
    },
  },
};
</script>

<style scoped>
table,
thead,
tbody,
tr,
th,
td {
  border: 2px solid lightgray;
}

thead>tr>th {
  width: 100px;
  padding: 5px 30px;
}

tbody>tr>th {
  min-width: 158px;
}

.body__room {
  width: 100px;
  height: 60px;
}

.calendar {
  border-collapse: collapse;
  margin-top: 12px;
}

.calendar__booking {
  position: absolute;
  height: 62px;
  background-color: deepskyblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

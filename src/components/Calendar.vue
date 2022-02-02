<template>
  <h2 style="margin: 0">{{ displayMonth }}</h2>
  <div class="button-container">
    <PrimaryButton value="前の月" :onClick="prevMonth" class="primary-button" />
    <PrimaryButton value="次の月" :onClick="nextMonth" class="primary-button" />
  </div>

  <div style="display: flex">
    <div class="calendar-youbi" v-for="n in 7" :key="n">
      {{ calcyoubi(n - 1) }}
    </div>
  </div>

  <div v-for="(week, index) in calendars" :key="index" class="calendar">
    <div class="row">
      <div
        v-for="(day, index) in week"
        :key="index"
        v-on:click="routerPush(day.month, day.date)"
        :class="{
          outside: currentMonth !== day.month,
          today:
            thisMonth === currentMonth &&
            today === day.date &&
            currentMonth === day.month,
        }"
      >
        {{ day.date }}

        <!-- <div
          class="content"
          v-if="conditions[day.date.toString()] && day.month === currentMonth"
        >
          😵
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
import PrimaryButton from "@/components/PrimaryButton.vue";
import router from "@/router";
import Loading from "@/components/Loading.vue";

@Options({
  // props: ["conditions"],
  data() {
    return {
      currentDate: moment(),
    };
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayMonth() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    },
    thisMonth() {
      return moment().format("YYYY-MM");
    },
    today() {
      return parseInt(moment().format("D"));
    },
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
      let calendars = [];

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            date: startDate.get("date"),
            month: startDate.format("YYYY-MM"),
          });
          startDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    routerPush(month: string, day: string) {
      console.log(month + "-" + day);
      router.push(`/${month + "-" + day}`);
    },
    calcyoubi(dayIndex: number) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },
  },
  mounted() {
    console.log(this.getCalendar());
  },
  components: {
    PrimaryButton,
    Loading,
  },
})
export default class Calendar extends Vue {}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
}
.primary-button {
  margin: 1em;
}
.calendar {
  border-top: 1px solid #df7861;
}
.calendar-youbi {
  flex: 1;
  border: 1px solid #df7861;
  margin-right: -1px;
  text-align: center;
}
.row {
  display: flex;
  border-left: 1px solid #df7861;
}
.row > div {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #df7861;
  border-bottom: 1px solid #df7861;
}
.row > div:hover {
  cursor: pointer;
}
.outside {
  background-color: #ddd;
  /* background-color: #f7f7f7; */
}
.today {
  background-color: #efd7d3;
}
@media screen and (max-width: 480px) {
  .row div {
    min-height: 60px;
  }
}
.content {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <Header />
  <Calendar />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import Calendar from "@/components/Calendar.vue";
@Options({
  components: {
    Header,
    Calendar,
  },
})
export default class Home extends Vue {}
</script>

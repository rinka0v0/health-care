<template>
  <Header />
  <Calendar />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import Calendar from "@/components/Calendar.vue";
import Loading from "@/components/Loading.vue";

@Options({
  components: {
    Header,
    Calendar,
    Loading,
  },
})
export default class Home extends Vue {}
</script>

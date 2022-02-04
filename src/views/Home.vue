<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-else>
    <Header />
    <Calendar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import Calendar from "@/components/Calendar.vue";
import { defaultConditions, fetchConditions } from "@/utils/fetcher/firestore";
import Loading from "@/components/Loading.vue";

@Options({
  data() {
    return {
      conditions: defaultConditions,
      loading: true,
    };
  },
  async created() {
    // const data = fetchConditions("useId", "2022", "1");
    // this.conditions = data;
    this.loading = false;
  },
  beforeCreate() {
    console.log("before");
  },
  components: {
    Header,
    Calendar,
    Loading,
  },
})
export default class Home extends Vue {}
</script>

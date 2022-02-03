<template>
  <div v-if="!load">
    <h1 class="title">体調管理アプリ</h1>
    <p>毎日の体調を管理することができます。</p>
    <p>googleアカウントでログインが可能です</p>
    <PrimaryButton value="Sign in with Google" :onClick="handleClick" />
  </div>

  <div v-else>
    <Loading />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { signInWithGoogle } from "@/utils/auth/index";
import Loading from "@/components/Loading.vue";

@Options({
  data() {
    return {
      loading: false,
    };
  },
  components: {
    PrimaryButton,
    Loading,
  },
  methods: {
    async handleClick(): Promise<void> {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.log(error);
      }
    },
  },
})
export default class Index extends Vue {}
</script>

<style>
.title {
  margin: 0;
  padding-top: 1em;
}
</style>

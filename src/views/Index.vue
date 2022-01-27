<template>
  <h1 class="title">体調管理アプリ</h1>
  <p>毎日の体調を管理することができます。</p>
  <p>googleアカウントでログインが可能です</p>
  <PrimaryButton value="Sign in with Google" :onClick="handleClick" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { signInWithGoogle } from "@/utils/auth/index";

@Options({
  components: {
    PrimaryButton,
  },
})
export default class Index extends Vue {
  count = 0;
  handleClick = async (): Promise<void> => {
    await signInWithGoogle();
  };
}
</script>

<style>
.title {
  margin: 0;
  padding-top: 1em;
}
</style>

<template>
  <Header />
  <h1 class="title">体調管理アプリ</h1>
  <p>毎日の体調を管理することができます。</p>
  <p>googleアカウントでログインが可能です</p>
  <PrimaryButton value="Sign in with Google" :onClick="handleClick" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

@Options({
  components: {
    Header,
    PrimaryButton,
  },
})
export default class Index extends Vue {
  count = 0;
  handleClick = (): void => {
    // ログイン処理をここに書く
    console.log("hello");
  };
}
</script>

<style>
.title {
  margin: 0;
}
</style>

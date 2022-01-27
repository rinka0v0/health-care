<template>
  <div id="overlay" v-show="showModal" v-on:click="clickEvent">
    <div id="content" v-on:click.stop>
      <p><slot></slot></p>
      <div class="close" v-on:click="clickEvent">×</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CreateComponentPublicInstance } from "@vue/runtime-core";
export default {
  props: ["showModal"],
  methods: {
    clickEvent(
      this: CreateComponentPublicInstance<
        Readonly<{
          showModal?: boolean;
        }>
      >
    ): void {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
/* モーダルのCSS */
#overlay {
  z-index: 1;
  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fcf8e8;
  position: relative;
  border-radius: 8px;
  .close {
    padding: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2em;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
  }
}
</style>

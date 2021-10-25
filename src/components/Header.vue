<template>
  <div class="header">
    <div>header</div>
  </div>
</template>

<script>
import { Vue } from "vue-class-component";

export default class Header extends Vue {}
</script>

<style>
.header {
  height: 60px;
  /* position: fixed; */
  /* top: 0; */
}
.header div {
  color: #df7861;
}
</style>

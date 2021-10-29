<template>
  <div>
    <button @click="onClick" class="btn">{{ value }}</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    value: String,
    onClick: Function,
  },
})
export default class TestButton extends Vue {}
</script>

<style lang="scss" scoped>
.btn {
  padding: 0.4em 0.5em;
  text-decoration: none;
  background: #d4e2d4;
  min-width: 100px;
  border-radius: 0.5em;
  user-select: none;
  color: inherit;
  border: none;
  font-size: 1em;
  &:hover {
    opacity: 0.7;
  }
}
</style>

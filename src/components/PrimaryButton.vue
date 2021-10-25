<template>
  <div class="btn">
    <a href="#" v-on:click="onClick">
      {{ value }}
    </a>
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
export default class PrimaryButton extends Vue {
  value!: string;
  onClick!: () => void;
}
</script>

<style>
.btn a {
  display: block;
  padding: 8px;
  text-decoration: none;
  background: #d4e2d4;
  min-width: 100px;
  border-radius: 1em;
  user-select: none;
}
.btn a {
  color: inherit;
  border: none;
}
.btn:hover {
  opacity: 0.7;
}
</style>

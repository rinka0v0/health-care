<template>
  <div :class="$style.errorMessage">{{ message }}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["message"],
})
export default class ErrorMessage extends Vue {}
</script>

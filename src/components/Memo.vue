<template>
  <div :class="$style.memo_item">
    {{ content }}
  </div>
</template>

<script lang="ts">
export default {
  props: ["content"],
};
</script>

<style lang="scss" module>
.memo_item {
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  max-width: 250px;
  border-radius: 16px;
  padding: 1em;
  text-align: left;
}
</style>

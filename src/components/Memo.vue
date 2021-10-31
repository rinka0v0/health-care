<template>
  <div class="memo-item">
    {{ content }}
    <div>{{ date }}</div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["content", "createdAt"],
  computed: {
    date(): string {
      const result = this.createdAt.split("-");
      return result[0] + "年" + result[1] + "月" + result[2] + "日";
    },
  },
};
</script>

<style lang="scss" scoped>
.memo-item {
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  padding: 1em;
  text-align: left;
  margin: 0 auto;
  div {
    text-align: right;
    margin-top: 1em;
  }
}
</style>

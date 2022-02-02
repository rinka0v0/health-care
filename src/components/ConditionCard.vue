<template>
  <div :class="$style.wrapper">
    <div :class="$style.label">{{ label }}</div>
    <div :class="$style.content">
      {{ contentData }} {{ temperature ? "℃" : "" }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["label", "contentData", "temperature"],
  created() {
    console.log(this.label, this.contentData);
  },
})
export default class ConditionCard extends Vue {}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: space-between;
  //   align-items: center;
  height: 3rem;
  line-height: 3rem;
  vertical-align: middle;
  width: 100%;
}
</style>

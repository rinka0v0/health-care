<template>
  <div v-for="(option, index) in options" :key="index">
    <label>
      <input
        type="checkbox"
        :name="name"
        :value="option.value"
        @change="updateValue"
        :checked="option.value === values[0]"
      />
      <span :class="$style.outside"><span :class="$style.inside"></span></span>
      {{ option.label }}
    </label>
  </div>
</template>

<script lang="ts">
import { CreateComponentPublicInstance } from "@vue/runtime-core";
export default {
  props: ["options", "name", "modelValue"],
  data() {
    return { values: [] as number[] };
  },
  created(
    this: CreateComponentPublicInstance<{
      values: number[];
      modelValue: number[];
    }>
  ): void {
    this.values = this.$props.modelValue as number[];
  },
  methods: {
    updateValue(
      this: CreateComponentPublicInstance<{
        values: number[];
      }>,
      e: Event
    ): void {
      if (e.target instanceof HTMLInputElement) {
        if (e.target.checked) {
          this.values[0] = parseInt(e.target.value);
        } else {
          this.values = [];
        }
      }
      this.$emit("update:modelValue", this.values);
    },
  },
};
</script>

<style lang="scss" module>
$almost-white: #f3f3f3;
$almost-black: #df7861;
$border: #cccccc;
$left: 25px;
$size: 30px;

@mixin centerer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

label {
  margin: 0.5em;
  display: block;
  position: relative;
  padding-left: $left;
  cursor: pointer;
  width: 80px;
}

input[type="checkbox"] {
  height: 1px;
  width: 1px;
  opacity: 0;
}

.outside {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -($size / 2);
  width: $size;
  height: $size;
  border: 2px solid $border;
  border-radius: 50%;
  box-sizing: border-box;
  background: $almost-white;
}

.inside {
  @include centerer;
  display: inline-block;
  border-radius: 50%;
  width: ($size - 10px);
  height: ($size - 10px);
  background: $almost-black;
  left: 3px;
  top: 3px;
  transform: scale(0, 0);
  .no-transforms & {
    left: auto;
    top: auto;
    width: 0;
    height: 0;
  }
}

input {
  &:checked {
    + .outside .inside {
      animation: radio-select 0.1s linear;
      transform: scale(1, 1);
      .no-transforms & {
        width: ($size - 10px);
        height: ($size - 10px);
      }
    }
  }
}

label {
  user-select: none;
}
</style>

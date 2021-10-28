<template>
  <div>{{ date }}の記録</div>

  <div class="container">
    <div class="temperature">
      <h3>体温</h3>
      <div class="tmp-container">
        <input
          type="text"
          id="temperature"
          placeholder="体温を入力"
          v-model="temperature"
        />
        <div>℃</div>
      </div>
    </div>

    <div>
      <h3>体調</h3>
      <div style="display: flex">
        <PrimaryRadio
          :options="conditions"
          v-model="condition"
          name="condition"
        />
      </div>
    </div>

    <div>
      <h3>頭痛</h3>
      <div style="display: flex">
        <PrimaryRadio :options="headaches" v-model="headache" name="headache" />
      </div>
    </div>

    <div>
      <h3>腰痛</h3>
      <div style="display: flex">
        <PrimaryRadio
          :options="lowerBackPains"
          v-model="lowerBackPain"
          name="lowerBackPain"
        />
      </div>
    </div>

    <div>
      <h3>めまい</h3>
      <div style="display: flex">
        <PrimaryRadio :options="dizzys" v-model="dizzy" name="dizzy" />
      </div>
    </div>
    <PrimaryButton value="保存" :onClick="handleSave" class="primary-button" />
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryRadio from "@/components/PrimaryRadio.vue";
// 0: 良い 1:普通  2:悪い
@Options({
  components: {
    PrimaryButton,
    PrimaryRadio,
  },
  data() {
    return {
      date: this.$route.params.date,
      temperature: "",
      conditions: [
        { label: "良い", value: 0 },
        { label: "普通", value: 1 },
        { label: "悪い", value: 2 },
      ],
      condition: "",
      headaches: [
        { label: "激痛", value: 0 },
        { label: "痛い", value: 1 },
        { label: "少し痛い", value: 2 },
      ],
      headache: "",
      dizzys: [
        { label: "ふわふわ", value: 0 },
        { label: "ガンガン", value: 1 },
      ],
      dizzy: "",
      lowerBackPains: [
        { label: "激痛", value: 0 },
        { label: "痛い", value: 1 },
        { label: "少し痛い", value: 2 },
      ],
      lowerBackPain: "",
      test: "",
    };
  },
  methods: {
    handleSave() {
      console.log(
        this.temperature,
        this.condition,
        this.headache,
        this.lowerBackPain,
        this.dizzy
      );
      console.log("保存しました");
    },
  },
})
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
@keyframes radio-select {
  0% {
    transform: scale(0, 0);
  }
  65% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}

/* styles */

$almost-white: #f3f3f3;
$almost-black: #df7861;
$border: #cccccc;
$left: 30px;
$size: 30px;

@mixin centerer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// @mixin centerer {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

body {
  color: $almost-black;
}

.container {
  @include centerer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tmp-container {
  display: flex;
  align-items: center;
}

label {
  margin: 0.5em;
  display: block;
  position: relative;
  padding-left: $left;
  cursor: pointer;
  width: 80px;
}

input[type="text"] {
  width: 100%;
  border: 2px solid $border;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
}

.primary-button {
  margin: 1em;
}
</style>

<template>
  <h3>{{ date }}の記録</h3>

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

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryRadio from "@/components/PrimaryRadio.vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import {
  conditions,
  headaches,
  dizzys,
  lowerBackPains,
} from "@/constants/index";
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

      conditions,
      condition: -1,

      headaches,
      headache: -1,

      dizzys,
      dizzy: -1,

      lowerBackPains,
      lowerBackPain: -1,

      uid: "",
    };
  },
  methods: {
    handleSave() {
      const result = this.date.split("-");
      const ref = doc(db, this.uid, result[0], result[1], result[2]);

      setDoc(
        ref,
        {
          date: this.date,
          temperature: this.temperature,
          condition: this.condition,
          headache: this.headache,
          lowerBackPain: this.lowerBackPain,
          dizzy: this.dizzy,
        },
        { merge: true }
      );
    },
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      const uid = user?.uid;
      this.uid = uid;
      // 記録データを取得してくる
      const date = this.date.split("-");
      const ref = doc(db, this.uid, date[0], date[1], date[2]);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.temperature = data.temperature;
        this.condition = Number(data.condition);
        this.headache = Number(data.headache);
        this.lowerBackPain = Number(data.lowerBackPain);
        this.dizzy = Number(data.dizzy);
      }
    });
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

h3 {
  margin: 0;
  padding: 0.5em;
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

#temperature {
  margin-right: 0.5em;
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

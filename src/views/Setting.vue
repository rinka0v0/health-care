<template>
  <div class="top">
    <PrimaryButton value="⇦戻る" :onClick="backToDetailPage" class="back" />
  </div>
  <h3>{{ date }}の記録</h3>

  <div class="container">
    <div class="temperature">
      <h3>体温</h3>

      <div class="tmp-container">
        <input
          step="0.1"
          type="number"
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
        <PrimaryRadio :options="dizzies" v-model="dizzy" name="dizzy" />
      </div>
    </div>
    <PrimaryButton value="保存" :onClick="handleSave" class="primary-button" />

    <div v-if="errorMessage">
      <ErrorMessage :message="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryRadio from "@/components/PrimaryRadio.vue";
import {
  conditions,
  headaches,
  dizzies,
  lowerBackPains,
} from "@/constants/index";
import router from "@/router";
import {
  Condition,
  fetchCondition,
  saveCondition,
} from "@/utils/fetcher/firestore";
import ErrorMessage from "@/components/ErrorMessage.vue";

@Options({
  components: {
    PrimaryButton,
    PrimaryRadio,
    ErrorMessage,
  },
  data() {
    return {
      date: this.$route.params.date,
      temperature: null,

      conditions,
      condition: null,

      headaches,
      headache: null,

      dizzies,
      dizzy: null,

      lowerBackPains,
      lowerBackPain: null,
      errorMessage: "",
    };
  },
  methods: {
    async handleSave() {
      try {
        const condition: Condition = {
          temperature: this.temperature,
          condition: this.condition,
          headaches: this.headache,
          dizzies: this.dizzy,
          lowerBackPains: this.lowerBackPain,
        };

        const [year, month, day] = this.date.split("-");

        await saveCondition(condition, this.userId, year, month, day).catch(
          (err) => {
            console.log(err);
          }
        );
        this.backToDetailPage();
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = "エラーが起きました🙇‍♂️";
        }
      }
    },
    backToDetailPage() {
      router.push(`/${this.date}`);
    },
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
  async created() {
    const [year, month, day] = this.date.split("-");

    const fetchedCondition = await fetchCondition(
      this.userId,
      year,
      month,
      day
    );
    if (fetchedCondition) {
      this.condition = parseInt(fetchedCondition.condition);
      this.dizzy = parseInt(fetchedCondition.dizzies);
      this.headache = parseInt(fetchedCondition.headaches);
      this.lowerBackPain = parseInt(fetchedCondition.lowerBackPains);
      // 体温は小数
      this.temperature = parseFloat(fetchedCondition.temperature);
    }
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

.top {
  display: flex;
  .back {
    margin: 1rem;
    cursor: pointer;
    user-select: none;
  }
}

@mixin centerer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

input[type="number"] {
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

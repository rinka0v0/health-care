<template>
  <div v-if="!loading">
    <div :class="$style.top">
      <PrimaryButton
        value="⇦戻る"
        :onClick="backToDetailPage"
        :class="$style.back"
      />
    </div>
    <h3>{{ date }}の記録</h3>

    <div :class="$style.container">
      <div :class="$style.temperature">
        <h3>体温</h3>

        <div :class="$style.tmp_container">
          <input
            step="0.1"
            type="number"
            id="temperature"
            placeholder="体温を入力"
            v-model="temperature"
            @input="updateTemperature"
          />
          <div>℃</div>
        </div>
      </div>

      <div>
        <h3>体調</h3>
        <div style="display: flex">
          <div :class="$style.flex">
            <CheckBox
              :options="conditions"
              name="condition"
              v-model="condition"
            />
          </div>
        </div>
      </div>

      <div>
        <h3>頭痛</h3>
        <div style="display: flex">
          <CheckBox :options="headaches" name="headache" v-model="headache" />
        </div>
      </div>

      <div>
        <h3>腰痛</h3>
        <div style="display: flex">
          <CheckBox
            :options="lowerBackPains"
            name="lowerBackPain"
            v-model="lowerBackPain"
          />
        </div>
      </div>

      <div>
        <h3>めまい</h3>
        <div style="display: flex">
          <CheckBox :options="dizzies" name="dizzy" v-model="dizzy" />
        </div>
      </div>

      <PrimaryButton
        value="保存"
        :onClick="handleSave"
        :class="$style.primary_button"
      />

      <div v-if="errorMessage">
        <ErrorMessage :message="errorMessage" />
      </div>
    </div>
  </div>

  <div v-else>
    <Loading />
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
import Loading from "@/components/Loading.vue";
import CheckBox from "@/components/CheckBox.vue";

@Options({
  components: {
    PrimaryButton,
    PrimaryRadio,
    ErrorMessage,
    Loading,
    CheckBox,
  },
  data() {
    return {
      date: this.$route.params.date,
      temperature: null,

      conditions,
      condition: [],

      headaches,
      headache: [],

      dizzies,
      dizzy: [],

      lowerBackPains,
      lowerBackPain: [],

      errorMessage: "",
      loading: true,
    };
  },
  methods: {
    updateTemperature(e: Event) {
      if (e.target instanceof HTMLInputElement && e.target.value === "") {
        this.temperature = null;
      }
    },
    async handleSave() {
      try {
        this.loading = true;
        const condition: Condition = {
          temperature: isNaN(this.temperature) ? null : this.temperature,
          condition: this.condition.length ? this.condition[0] : null,
          headaches: this.headache.length ? this.headache[0] : null,
          dizzies: this.dizzy.length ? this.dizzy[0] : null,
          lowerBackPains: this.lowerBackPain.length
            ? this.lowerBackPain[0]
            : null,
        };

        console.log(condition, "condition");

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
      } finally {
        this.loading = false;
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
      if (fetchedCondition.condition != null) {
        this.condition.push(parseInt(fetchedCondition.condition));
      }
      if (fetchedCondition.dizzies != null) {
        this.dizzy.push(parseInt(fetchedCondition.dizzies));
      }
      if (fetchedCondition.headaches != null) {
        this.headache.push(parseInt(fetchedCondition.headaches));
      }
      if (fetchedCondition.lowerBackPains != null) {
        this.lowerBackPain.push(parseInt(fetchedCondition.lowerBackPains));
      }
      if (fetchedCondition.temperature != null) {
        this.temperature = parseFloat(fetchedCondition.temperature);
      }
      console.log(fetchedCondition);
      // 体温は小数
    }
    this.loading = false;
  },
})
export default class Setting extends Vue {}
</script>

<style lang="scss" module>
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

.tmp_container {
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

.primary_button {
  margin: 1em;
}

.flex {
  display: flex;
}
</style>

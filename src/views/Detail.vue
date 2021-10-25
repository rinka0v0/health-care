<template>
  <div class="top">
    <div>←戻る</div>
  </div>
  <h2>{{ date }}</h2>

  <div class="container">
    <div class="weather">
      <h2>この日の天気</h2>
      <div>天候: 晴れ</div>
      <div>気温: 23.3℃</div>
      <div>湿度: 30%</div>
    </div>
    <div class="flex list">
      <div>体温</div>
      <div>36.8℃</div>
    </div>
    <div class="flex list">
      <div>体調</div>
      <div>良い😀</div>
    </div>
    <div class="flex list">
      <div>吐き気</div>
      <div>ひどい</div>
    </div>
    <div class="flex list">
      <div>めまい</div>
      <div>ひどい</div>
    </div>
    <div class="flex list">
      <div>頭痛</div>
      <div>ひどい</div>
    </div>
    <div class="flex list">
      <div>気分</div>
      <div>ひどい</div>
    </div>
    <PrimaryButton
      value="記録する"
      class="primary-button"
      :onClick="routerPush"
    />
    <div class="memo">
      <h2>メモ</h2>
      <div class="memo-item">
        今日は朝から体調がよい！！っっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっっ
        <div>2021年10月4日</div>
      </div>
    </div>
    <PrimaryButton value="メモする" class="primary-button" />
  </div>
</template>

<script>
import router from "@/router";
import moment from "moment";
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "../components/PrimaryButton.vue";
@Options({
  components: {
    PrimaryButton,
  },
  data() {
    return {
      param: this.$route.params.date,
      currentDate: moment().format("YYYY-M-D"),
    };
  },
  created() {
    if (this.param === this.currentDate) {
      // 現在の天気情報を取りに行く
      console.log("true");
    } else if (this.param < this.currentDate) {
      // paramに入っている日付の天気を取りに行く
      console.log("ok!");
    }
  },
  computed: {
    date() {
      const result = this.param.split("-");
      return result[0] + "年" + result[1] + "月" + result[2] + "日";
    },
  },
  methods: {
    routerPush() {
      router.push(`/${this.$route.params.date}/setting`);
    },
  },
})
export default class Detail extends Vue {}
</script>

<style scoped>
.top {
  display: flex;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list {
  width: 300px;
}
.list > div {
  width: 70px;
  margin: 0.5em 2em;
}
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  font-size: 1.2em;
}
.primary-button {
  margin: 2em;
}
.weather {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  padding: 1em;
}
.memo-item {
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  padding: 1em;
  text-align: left;
}
.memo-item div {
  text-align: right;
  margin-top: 1em;
}
</style>

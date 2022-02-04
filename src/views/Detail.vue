<template>
  <div v-if="!loading">
    <div class="top">
      <PrimaryButton value="⇦戻る" class="back" :onClick="backToHomePage" />
    </div>

    <h2>{{ date }}</h2>

    <div class="container">
      <div v-if="!validKeys.length">まだ記録がありません</div>
      <div v-for="key in validKeys" :key="key">
        <div class="health-info" v-if="key !== 'temperature'">
          <conditionCard
            :label="LABELS[key]"
            :contentData="HEALTH_ITEM_LIST[key][healthInfo[key]]['label']"
          />
        </div>
        <div class="health-info" v-else>
          <conditionCard
            :label="LABELS[key]"
            :contentData="healthInfo[key]"
            :temperature="true"
          />
        </div>
      </div>

      <PrimaryButton
        value="記録する"
        class="primary-button"
        :onClick="routerPush"
      />

      <h2>メモ📄</h2>
      <div v-if="!memos.length">メモはありません</div>

      <div v-for="memo in memos" :key="memo.content" class="memo_wrapper">
        <Memo :content="memo.content" />
      </div>

      <PrimaryButton
        value="メモを書く"
        class="primary-button"
        :onClick="openModal"
      />
      <Modal v-show="showModal" v-on:closeModal="closeModal">
        <textarea
          name="memo"
          id="memo"
          cols="30"
          rows="10"
          v-model="memo"
          class="textarea"
        ></textarea>
        <PrimaryButton value="保存" :onClick="saveMemo" />
      </Modal>
    </div>
  </div>

  <div v-else>
    <Loading />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import moment from "moment";
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "../components/PrimaryButton.vue";
import Modal from "@/components/Modal.vue";
import { STATIC_ROUTES } from "@/router/routes";
import {
  fetchCondition,
  getMemosRef,
  saveMemo,
} from "@/utils/fetcher/firestore";
import Loading from "@/components/Loading.vue";
import Memo from "@/components/Memo.vue";
import {
  onSnapshot,
  DocumentData,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { HEALTH_LABELS, HEALTH_ITEM_LIST } from "@/constants/index";
import ConditionCard from "@/components/ConditionCard.vue";
import { CreateComponentPublicInstance } from "@vue/runtime-core";

@Options({
  components: {
    PrimaryButton,
    Modal,
    Memo,
    Loading,
    ConditionCard,
  },
  data() {
    return {
      param: this.$route.params.date,
      currentDate: moment().format("YYYY-M-D"),
      showModal: false,
      memos: [],
      memo: "",
      loading: true,
      healthInfo: {},
      LABELS: HEALTH_LABELS,
      HEALTH_ITEM_LIST,
    };
  },
  async created() {
    try {
      const [year, month, day] = this.param.split("-");
      const q = query(
        getMemosRef(this.userId, year, month, day),
        orderBy("createdAt", "asc")
      );
      onSnapshot(q, (querySnapshot) => {
        const memos: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          memos.push({ content: doc.data().content });
        });
        this.memos = memos;
      });

      const data = await fetchCondition(this.userId, year, month, day);
      if (data) {
        this.healthInfo = data;
        console.log(this.healthInfo);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    date() {
      const result = this.param.split("-");
      return result[0] + "年" + result[1] + "月" + result[2] + "日";
    },
    userId() {
      return this.$store.state.auth.userId;
    },
    validKeys() {
      if (this.healthInfo) {
        const validKeys: string[] = [];
        Object.keys(HEALTH_LABELS).map((key) => {
          if (this.healthInfo[key] != null && key !== "temperature") {
            console.log(this.healthInfo[key] !== "", key);

            validKeys.push(key);
          } else if (this.healthInfo[key]) {
            validKeys.push(key);
          }
        });
        return validKeys;
      }
    },
  },
  methods: {
    routerPush() {
      router.push(`/${this.$route.params.date}/setting`);
    },
    backToHomePage() {
      router.push(STATIC_ROUTES.HOME);
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.memo = "";
    },
    async saveMemo() {
      try {
        this.loading = true;
        if (!this.memo) {
          return;
        }
        const [year, month, day] = this.param.split("-");
        await saveMemo(this.memo, this.userId, year, month, day);
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
})
export default class Detail extends Vue {}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  .back {
    margin: 1rem;
    cursor: pointer;
    user-select: none;
  }
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
  justify-content: center;
  max-width: 800px;
  width: 100%;
  font-size: 1.2em;
}
.health-info {
  width: 300px;
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
.memo_wrapper {
  margin-top: 1rem;
  width: 250px;
}
.textarea {
  color: #df7861;
  resize: none;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid #eee;
}
.textarea:focus {
  outline: none;
}
</style>

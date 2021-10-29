<template>
  <div class="header">
    <h3>HealthCare</h3>
    <PrimaryButton
      value="SingOut"
      :onClick="handleClick"
      class="primary-button"
    />
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/components/PrimaryButton.vue";
import { signOut } from "firebase/auth";
import router from "@/router";
import { auth } from "../../firebase";
import { NavigationFailure } from "vue-router";

export default {
  components: {
    PrimaryButton,
  },
  methods: {
    async handleClick(): Promise<void | NavigationFailure | undefined> {
      await signOut(auth);
      return router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ecb390;
  h3 {
    color: #df7861;
    margin-left: 1em;
  }
  .primary-button {
    margin: 1em;
  }
}
</style>

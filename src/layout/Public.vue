<template>
  <div class="auth-wrapper">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Public",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.auth-wrapper {
  display: grid;
  place-items: center; /* Centers content horizontally & vertically */
  height: 100vh;
}
</style>

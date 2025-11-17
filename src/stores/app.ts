import type { NullableString } from "@/types/global.ts";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const pageTitle: Ref<NullableString> = ref(null);

  function setPageTitle(value: NullableString) {
    pageTitle.value = value;
  }

  return {
    pageTitle,
    setPageTitle,
  };
});

import { createI18n } from "vue-i18n";
import i18nFa from "@/i18n/fa";

const messages = {
  fa: {
    ...i18nFa,
  },
};

const i18n = new (createI18n as any)({
  legacy: false,
  locale: "fa",
  messages,
});

export default i18n;

// Styles
import "@/assets/styles/main.scss";
import "vuetify/styles";

// Composables
import { useI18n } from "vue-i18n";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import i18n from "./i18n";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: "mdi",
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  defaults: {
    VBtn: {
      color: "primary",
    },
    VTextField: {
      variant: "outlined",
    },
    VAutocomplete: {
      variant: "outlined",
      clearIcon: "close",
      itemValue: "id",
    },
    VSelect: {
      variant: "outlined",
      itemValue: "id",
    },
    VBottomSheet: {
      closeOnBack: false,
    },
    VSwitch: {
      color: "primary",
      baseColor: "surface-container-highest",
      inset: true,
      hideDetails: true,
    },
  },
});

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
  theme: {
    themes: {
      light: {
        variables: {
          "medium-emphasis-opacity": 1,
        },
        colors: {
          background: "#FBFCFB",
          "on-background": "#1A1C1B",
          primary: "#106565",
          "inverse-primary": "#97DEDE",
          "on-primary": "#FFFFFF",
          primary50: "#1DB8B8",
          primary95: "#DCF4F4",
          primary98: "#F1FBFB",
          secondary: "#10e010",
          "on-secondary": "#FFFFFF",
          "secondary-container": "#a5f2a5",
          "on-secondary-container": "#146614",
          surface: "#FBFCFB",
          "inverse-surface": "#2E3130",
          "on-surface": "#191C1B",
          "surface-bright": "#FBFCFB",
          "surface-container-low": "#F5F7F6",
          "surface-container": "#F1F3F2",
          "surface-container-high": "#EAECEB",
          "surface-container-highest": "#E0E3E2",
          "on-surface-variant": "#3F4946",
          success: "#176D31",
          error: "#BA1A1A",
          "on-error": "#FFFFFF",
          outline: "#6F7975",
          "outline-variant": "#BFC9C4",
          "neutral-variant95": "#E9F3EE",
        },
      },
    },
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

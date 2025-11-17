import pinia from "../stores";
import router from "@/router";
import i18n from "./i18n";
import vuetify from "./vuetify";
import type { App } from "vue";
import vMobileInput from "@/directives/v-mobile";

export function registerPlugins(app: App) {
  app.directive("mobile", vMobileInput);
  app.use(vuetify).use(router).use(pinia).use(i18n);
}

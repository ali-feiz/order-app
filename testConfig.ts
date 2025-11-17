import { config } from "@vue/test-utils";
import { beforeAll, afterAll } from "vitest";
import { createTestingPinia, TestingOptions } from "@pinia/testing";
import { Plugin, createApp } from "vue";
import App from "./src/App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { VueWrapper } from "@vue/test-utils";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();
config.global.plugins = [vuetify];
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);

export function installPinia(options?: Partial<TestingOptions>) {
  const globalConfigBackup = structuredClone(config.global);
  beforeAll(() => {
    config.global.plugins.unshift(
      createTestingPinia(options) as unknown as Plugin
    );
  });
  afterAll(() => {
    config.global = globalConfigBackup;
  });
}

export function getByTestId(name: string, wrapper: VueWrapper) {
  return wrapper.find(`[testid=${name}]`);
}

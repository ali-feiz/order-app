<template>
  <v-container class="date-picker-container" :style="containerStyle">
    <div class="date-picker-wrapper">
      <v-text-field
        v-model="displayDate"
        :label="computedLabel"
        :placeholder="computedPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :required="required"
        :error="hasError"
        :error-messages="errorMessages"
        class="date-input"
        @click="handleInputClick"
      />

      <v-btn
        v-if="showClearButton"
        icon
        size="small"
        variant="text"
        class="clear-button"
        :disabled="disabled"
        @click="handleClear"
      >
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </div>

    <PersianDatePicker
      v-model="selectedDate"
      :format="format"
      :display-format="displayFormat"
      :disabled="disabled"
      auto-submit
      custom-input=".date-input"
      no-input
      @change="handleDateChange"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import PersianDatePicker from "vue3-persian-datetime-picker";
import i18n from "@/plugins/i18n";

const { t } = i18n.global;

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "YYYY/MM/DD",
  },
  displayFormat: {
    type: String,
    default: "jYYYY/jMM/jDD",
  },
  required: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "400px",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: [String, Array],
    default: () => [],
  },
  onChange: {
    type: Function,
    default: null,
  },
  onClear: {
    type: Function,
    default: null,
  },
});

// ===== EMITS =====
const emit = defineEmits([
  "update:modelValue",
  "change",
  "clear",
  "blur",
  "focus",
  "click",
]);

// ===== REACTIVE STATE =====
const selectedDate = ref(props.modelValue);
const displayDate = ref("");
const dialog = ref(false);

// ===== COMPUTED PROPERTIES =====
const computedLabel = computed(() => props.label || t("shared.date"));

const computedPlaceholder = computed(
  () => props.placeholder || t("shared.selectDate")
);

const containerStyle = computed(() => ({
  maxWidth: props.maxWidth,
}));

const showClearButton = computed(
  () => props.clearable && displayDate.value && !props.disabled
);

const hasError = computed(
  () =>
    props.error ||
    (Array.isArray(props.errorMessages) && props.errorMessages.length > 0)
);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedDate.value = newValue;
    if (newValue) {
      displayDate.value = newValue;
    } else {
      displayDate.value = "";
    }
  },
  { immediate: true }
);

const handleInputClick = () => {
  emit("click");
};

const handleDateChange = (value) => {
  try {
    const formattedDate = value.format(props.displayFormat);
    const formattedValue = value.format(props.format);

    displayDate.value = formattedDate;
    selectedDate.value = formattedValue;
    dialog.value = false;

    emit("update:modelValue", formattedValue);
    emit("change", formattedValue);

    if (props.onChange) {
      props.onChange(formattedValue);
    }
  } catch (error) {
    console.error("Date formatting error:", error);
  }
};

const handleClear = () => {
  displayDate.value = "";
  selectedDate.value = "";
  dialog.value = false;

  emit("update:modelValue", "");
  emit("change", "");
  emit("clear");

  if (props.onChange) {
    props.onChange("");
  }

  if (props.onClear) {
    props.onClear();
  }
};
</script>

<style scoped>
.date-picker-container {
  padding: 16px;
}

.date-picker-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.date-input {
  width: 100%;
}

.clear-button {
  position: absolute;
  left: 9px;
  top: 38%;
  transform: translateY(-50%);
  z-index: 10;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.clear-button:hover {
  opacity: 1;
}

.clear-button .v-icon {
  font-size: 16px !important;
}

:deep(.vue3-persian-datetime-picker) {
  z-index: 3000;
  direction: rtl;
}

@media (max-width: 600px) {
  .date-picker-container {
    padding: 8px;
  }

  .clear-button {
    left: 6px;
    min-width: 20px !important;
    width: 20px !important;
    height: 20px !important;
  }

  .clear-button .v-icon {
    font-size: 14px !important;
  }
}

.clear-button:focus {
  outline: 2px solid var(--v-theme-primary);
  outline-offset: 2px;
}

.clear-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>

<template>
  <v-container class="mt-5" max-width="700">
    <v-card class="pa-6" elevation="3">
      <h3 class="mb-4">{{ $t("orders.registerOrders") }}</h3>

      <v-form ref="orderForm">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="model.firstName"
              :label="$t('orders.firstName')"
              variant="outlined"
              :rules="[required]"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="model.lastName"
              :label="$t('orders.lastName')"
              variant="outlined"
              :rules="[required]"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="model.mobile"
              :label="$t('orders.mobile')"
              variant="outlined"
              v-mobile
              type="tel"
              :rules="[required, mobileRule]"
            />
          </v-col>

          <v-col cols="12" md="6">
            <date-picker
              v-model="model.receiveDate"
              :label="$t('orders.receiveDate')"
              variant="outlined"
              :rules="[required]"
            ></date-picker>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="model.address"
              :label="$t('orders.address')"
              variant="outlined"
              rows="3"
              :rules="[required]"
            />
          </v-col>
        </v-row>
      </v-form>

      <v-alert
        v-if="tableError"
        class="mt-5"
        :text="tableError"
        type="error"
      ></v-alert>

      <v-row class="mt-4">
        <v-col cols="12" md="9">
          <v-autocomplete
            ref="productAutocomplete"
            v-model="selectedProduct"
            :items="products"
            item-title="name"
            item-value="id"
            :label="$t('orders.products')"
            variant="outlined"
            return-object
            @keydown.enter.stop.prevent="addProduct"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-btn class="mt-1" color="primary" block @click="addProduct">
            {{ $t("orders.add") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-table class="mt-6" Striped>
        <thead>
          <tr>
            <th>{{ $t("orders.productName") }}</th>
            <th>{{ $t("orders.barcode") }}</th>
            <th>{{ $t("orders.quantity") }}</th>
            <th>{{ $t("orders.delete") }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in orderItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.barcode }}</td>

            <td style="width: 120px">
              <v-text-field
                v-model="item.qty"
                type="number"
                min="1"
                density="compact"
                variant="outlined"
              />
            </td>

            <td>
              <v-btn color="red" variant="text" @click="openDeleteDialog(item)">
                حذف
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div class="mt-6 text-right">
        <v-btn color="success" large @click="submitOrder">
          {{ $t("orders.registerOrders") }}
        </v-btn>
      </div>
    </v-card>
  </v-container>

  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card class="pa-4">
      <h3 class="mb-4 text-center">
        {{ $t("orders.deleteThisProduct", { name: itemToDelete?.name }) }}
      </h3>

      <v-row>
        <v-col cols="6">
          <v-btn color="grey" block @click="deleteDialog = false">{{
            $t("orders.optOut")
          }}</v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn color="red" block @click="confirmDelete">{{
            $t("orders.delete")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>

  <v-dialog v-model="duplicateDialog" max-width="380">
    <v-card class="pa-4">
      <h3 class="mb-3 text-center">{{ $t("orders.duplicateProduct") }}</h3>

      <p class="text-center mb-5">
        {{
          $t("orders.duplicateProductNameDialog", {
            name: duplicateProductName,
          })
        }}
      </p>

      <v-btn color="primary" block @click="duplicateDialog = false">
        {{ $t("orders.ok") }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, nextTick } from "vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import i18n from "@/plugins/i18n";
import { isEmpty } from "@/utils/document/index";

const { t } = i18n.global;
const productAutocomplete = ref(null);
const orderForm = ref(null);
const tableError = ref("");

const model = ref({
  firstName: "",
  lastName: "",
  receiveDate: "",
  mobile: "",
  address: "",
});

const required = (v) => !!v || t("orders.required");
const mobileRule = (v) =>
  /^09\d{9}$/.test(v) || t("orders.mobileNumberIsInvalid");

const products = [
  { id: 1, name: "الویه مرغ 200 گرمی", barcode: "1111111111" },
  { id: 2, name: "الویه کالباس 500 گرمی", barcode: "2222222222" },
  { id: 3, name: "ساندویچ مرغ گریل", barcode: "3333333333" },
  { id: 4, name: "نیم چاباتا رست بیف", barcode: "4444567793" },
];

const selectedProduct = ref(null);
const orderItems = ref([]);
const duplicateDialog = ref(false);
const duplicateProductName = ref("");

const addProduct = () => {
  if (!selectedProduct.value) return;

  if (orderItems.value.some((p) => p.id === selectedProduct.value.id)) {
    duplicateProductName.value = selectedProduct.value.name;
    duplicateDialog.value = true;
    return;
  }

  orderItems.value.push({
    ...selectedProduct.value,
    qty: 1,
  });

  tableError.value = "";

  nextTick(() => {
    selectedProduct.value = null;
    productAutocomplete.value?.reset?.();
    productAutocomplete.value?.focus?.();
  });
};

const deleteDialog = ref(false);
const itemToDelete = ref(null);

const openDeleteDialog = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
};

const confirmDelete = () => {
  orderItems.value = orderItems.value.filter(
    (i) => i.id !== itemToDelete.value.id
  );
  deleteDialog.value = false;
};

const submitOrder = () => {
  const isFormValid = orderForm.value?.validate();
  const hasProducts = !isEmpty(orderItems.value);

  tableError.value = hasProducts ? "" : t("orders.selectAtLeastOneProduct");

  if (isFormValid && hasProducts) {
    console.log("ثبت سفارش انجام شد", {
      ...model.value,
      orderItems: orderItems.value,
    });
    orderForm.value.reset();
    orderItems.value = [];
    tableError.value = "";
  }
};
</script>

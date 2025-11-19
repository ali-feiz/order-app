import { mount } from "@vue/test-utils";
import orders from "@/views/orders.vue";
import { nextTick } from "vue";
import { describe, test, vi, expect } from "vitest";

describe("Orders.vue", () => {
  const mountComponent = () =>
    mount(orders, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });

  test("renders page title", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("orders.registerOrders");
  });

  test("prevents duplicate product", async () => {
    const wrapper = mountComponent();

    const product = { id: 1, name: "Test Product", barcode: "111" };

    wrapper.vm.orderItems = [{ ...product, qty: 1 }];
    wrapper.vm.selectedProduct = product;

    await wrapper.vm.addProduct();
    await nextTick();

    expect(wrapper.vm.duplicateDialog).toBe(true);
  });

  test("deletes a product after confirming", async () => {
    const wrapper = mountComponent();

    const product = { id: 1, name: "Test Product", barcode: "111", qty: 1 };

    wrapper.vm.orderItems = [product];
    wrapper.vm.itemToDelete = product;

    await wrapper.vm.confirmDelete();
    await nextTick();

    expect(wrapper.vm.orderItems.length).toBe(0);
  });

  test("shows error if submitting with no products", async () => {
    const wrapper = mountComponent();

    wrapper.vm.orderForm = {
      validate: () => true,
    };

    await wrapper.vm.submitOrder();
    await nextTick();

    expect(wrapper.vm.tableError).toBe("انتخاب حداقل یک کالا الزامی است");
  });

  test("submits successfully when form + products are valid", async () => {
    const wrapper = mountComponent();

    wrapper.vm.orderItems = [
      { id: 1, name: "Test Product", qty: 1, barcode: "111" },
    ];

    wrapper.vm.orderForm = {
      validate: () => true,
      reset: vi.fn(),
    };

    const logSpy = vi.spyOn(console, "log");

    await wrapper.vm.submitOrder();
    await nextTick();

    expect(logSpy).toHaveBeenCalled();
    expect(wrapper.vm.orderItems.length).toBe(0);
  });
});

import type { ObjectDirective } from "vue";
import type { NullableString } from "@/types/global";
import { mobileDenormalize } from "@/utils/mobileNormalization";
import { getFirstInputElement } from "@/utils/document";

function inputHandler(event: Event) {
  const target = event.target as HTMLInputElement;

  let value: NullableString = target.value;
  if (!value) {
    return;
  }
  value = `${value.replace(/[^\d]/g, "")}`;
  value = mobileDenormalize(value);
  if (target.value !== value) {
    target.value = value || "";

    const fakeEvent = new Event("input");
    target.dispatchEvent(fakeEvent);
  }
}

const vMobileInput: ObjectDirective = {
  mounted(el: Element) {
    const input = getFirstInputElement(el);

    input.addEventListener("input", (event) => inputHandler(event));
  },
};

export default vMobileInput;

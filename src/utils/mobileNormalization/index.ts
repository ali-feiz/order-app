import type { NullableString } from "@/types/global";
import { GEOLOCATION_CONFIG } from "@/constants/geolocation";

export function mobileNormalize(mobile: NullableString) {
  if (!mobile) return null;
  const countryCode = GEOLOCATION_CONFIG.defaultCountry.phoneCode;
  if (mobile.startsWith(countryCode)) {
    return mobile;
  }
  return mobile
    .replace(/^0098/, "+98")
    .replace(/^0/, countryCode)
    .replace(/^9/, `${countryCode}9`);
}

export function mobileDenormalize(mobile: NullableString) {
  if (!mobile) return null;

  const countryCode = GEOLOCATION_CONFIG.defaultCountry.phoneCode;
  const countryCodePlain = countryCode.replace("+", "");

  return mobile
    .replace(new RegExp(`^\\+?${countryCodePlain}`), "0")
    .replace(/^0098/, "0")
    .replace(/^9/, "09");
}

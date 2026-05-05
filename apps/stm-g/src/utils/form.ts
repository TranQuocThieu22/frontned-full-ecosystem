import { isNotEmpty } from "@mantine/form";

export function utils_form_validateEmpty(message?: string) {
  return isNotEmpty(message ? message : "Không được để trống")
}

export function utils_form_validateEmail(value?: string) {
  return /^\S+@\S+$/.test(value!) ? null : "Email không đúng định dạng";
}

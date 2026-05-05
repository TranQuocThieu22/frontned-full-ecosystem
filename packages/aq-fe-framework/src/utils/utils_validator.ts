export const utils_validator_validateCode = (value?: string) => {
  if (!value) return "Không được để trống";
  // const isValid = /^[A-Za-z0-9][A-Za-z0-9-]*$/.test(value);
  // return isValid ? null : "Chỉ được nhập chữ, số và dấu '-' (không bắt đầu bằng '-')";
  return null
};
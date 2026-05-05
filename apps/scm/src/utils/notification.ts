import { DefaultMantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface I {
  crudType?: "delete" | "update" | "create" | "register";
  message?: string;
  color?: DefaultMantineColor | undefined;
}

export function U0MyShowNotification({ crudType = "create", message, color }: I) {
  if (crudType == "create") {
    notifications.show({
      message: message ? message : "Thêm thành công!",
      color: color ? color : "green",
    });
    return;
  }
  if (crudType == "update") {
    notifications.show({
      message: message ? message : "Chỉnh sửa thành công!",
      color: color ? color : "green",
    });
    return;
  }
  if (crudType == "delete") {
    notifications.show({
      message: message ? message : "Xóa thành công!",
      color: color ? color : "green",
    });
    return;
  }
  if (crudType == "register") {
    notifications.show({
      message: message ? message : "Đăng ký thành công!",
      color: color ? color : "green",
    });
    return;
  }
}

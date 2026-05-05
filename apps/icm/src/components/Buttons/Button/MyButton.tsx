import { T0CRUD } from "@/types/types";
import { Button, ButtonProps } from "@mantine/core";
import { IconCheckbox, IconDeviceFloppy, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    crudType?: T0CRUD
    children?: ReactNode;
}

export function MyButton({ children, crudType = "delete", ...rest }: IMyButton) {
    if (crudType == "default") {
        return (
            <Button color="indigo" {...rest}>
                {children}
            </Button>
        );
    }
    if (crudType == "create") {
        return (
            <Button color="indigo" type="submit" leftSection={<IconPlus />} {...rest}>
                {children ? children : "Lưu"}
            </Button>
        );
    }
    if (crudType == "createMultiple") {
        return (
            <Button color="green" type="submit" leftSection={<IconPlus />} {...rest}>
                {children ? children : "Thêm danh sách"}
            </Button>
        );
    }
    if (crudType == "delete") {
        return (
            <Button color="red" leftSection={<IconTrash />} {...rest}>
                {children ? children : "Xóa"}
            </Button>
        );
    }
    if (crudType == "update") {
        return (
            <Button color="yellow" type="submit" leftSection={<IconEdit />} {...rest}>
                {children ? children : "Chỉnh sửa"}
            </Button>
        );
    }
    if (crudType == "save") {
        return (
            <Button color="green" type="submit" leftSection={<IconDeviceFloppy />} {...rest}>
                {children ? children : "Lưu"}
            </Button>
        );
    }
    if (crudType == "register") {
        return (
            <Button color="indigo" type="submit" leftSection={<IconPlus />} {...rest}>
                {children ? children : "Đăng ký"}
            </Button>
        );
    }
    if (crudType == "validate") {
        return (
            <Button color="green" type="submit" leftSection={<IconCheckbox />} {...rest}>
                {children ? children : "Duyệt"}
            </Button>
        );
    }
}

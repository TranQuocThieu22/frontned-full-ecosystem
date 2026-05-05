"use client";

import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Checkbox, ColorInput, DEFAULT_THEME, Modal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

interface Props {
    handleCreateOrUpdate: Function;
    conclusion?: SRMConclusion;
}

export default function ConclusionCreateOrUpdateButton({ conclusion, handleCreateOrUpdate }: Props) {
    const disc = useDisclosure();

    const form = useForm<SRMConclusion>({
        mode: "uncontrolled",
        validate: {
            code: (value) => ((value ?? "").trim() === "" ? "Mã không được để trống" : null),
            name: (value) => ((value ?? "").trim() === "" ? "Tên không được để trống" : null),
        },
    });

    const setValueForm = () => {
        if (!conclusion) return;
        form.setValues({
            ...conclusion,
            code: conclusion.code ?? "",
            name: conclusion.name ?? "",
            color: conclusion.color ?? "",
            note: conclusion.note ?? "",
            isPass: conclusion.isPass ?? false,
        });
    }

    useEffect(() => {
        setValueForm();
    }, [conclusion])

    const handleSubmit = (newValues: SRMConclusion) => {
        // cap nhat
        if (conclusion) {
            handleCreateOrUpdate(conclusion, newValues);
            disc[1].close();
            notifications.show({
                color: "green",
                message: "Cập nhật kết luận thành công",
            });
            return;
        }
        // create
        const result = handleCreateOrUpdate(newValues);
        if (result) {
            form.reset();
            disc[1].close();
            notifications.show({
                color: "green",
                message: "Thêm kết luận thành công",
            });
        } else {
            form.setFieldError(
                "code",
                "Mã kết luận đã tồn tại"
            );
        }
    };

    return (
        <>
            {!conclusion
                ? <CustomButton
                    actionType="create"
                    onClick={disc[1].open}
                />
                : <CustomActionIcon
                    actionType="update"
                    onClick={disc[1].open}
                />
            }
            <Modal
                title={!conclusion ? "Tạo kết luận" : "Chỉnh sửa kết luận"}
                opened={disc[0]}
                onClose={() => {
                    disc[1].close();
                    form.clearErrors();
                    setValueForm();
                }}
            >
                <Stack gap={5}>
                    <CustomTextInput
                        label="Mã kết luận"
                        {...form.getInputProps("code")}
                        readOnly={!!conclusion}
                        withAsterisk
                    />
                    <CustomTextInput
                        label="Tên kết luận"
                        {...form.getInputProps("name")}
                        withAsterisk
                    />
                    <ColorInput
                        closeOnColorSwatchClick
                        label="Màu sắc hiển thị"
                        placeholder="Chọn màu sắc hiển thị"
                        swatches={[
                            ...DEFAULT_THEME.colors.red,
                            ...DEFAULT_THEME.colors.green,
                            ...DEFAULT_THEME.colors.blue,
                        ]}
                        {...form.getInputProps("color")}
                    />
                    <Checkbox
                        mt="sm"
                        label="Đạt"
                        defaultChecked={form.getValues().isPass}
                        {...form.getInputProps("isPass")}
                    />
                    <CustomTextArea
                        label="Ghi chú"
                        {...form.getInputProps("note")}
                    />
                    <CustomButton
                        mt="sm"
                        fullWidth
                        actionType={!conclusion ? "create" : "update"}
                        onClick={() => {
                            const result = form.validate();
                            if (!result.hasErrors) {
                                handleSubmit(form.getValues());
                            }
                        }}
                    />
                </Stack>
            </Modal>
        </>
    );
}


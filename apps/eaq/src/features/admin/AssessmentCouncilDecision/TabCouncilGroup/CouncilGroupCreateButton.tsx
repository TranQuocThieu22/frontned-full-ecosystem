"use client";

import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Modal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface Props {
    handleCreateWorkingGroup: Function;
}

export default function CouncilGroupCreateButton({ handleCreateWorkingGroup }: Props) {
    const disc = useDisclosure();

    const form = useForm<ICouncilGroup>({
        initialValues: {
            code: "",
            name: "",
        },
        validate: {
            code: (value) => ((value ?? "").trim() === "" ? "Mã không được để trống" : null),
            name: (value) => ((value ?? "").trim() === "" ? "Tên không được để trống" : null),
        },
    });

    const handleSubmit = (values: ICouncilGroup) => {
        const result = handleCreateWorkingGroup(values);
        if (result) {
            form.reset();
            disc[1].close();
            notifications.show({
                color: "green",
                message: "Thêm nhóm công tác thành công",
            });
        } else {
            form.setFieldError(
                "code",
                "Mã nhóm công tác đã tồn tại"
            );
        }
    };

    return (
        <>
            <CustomButton
                actionType="create"
                onClick={disc[1].open}
            />
            <Modal
                title="Tạo nhóm công tác"
                opened={disc[0]}
                onClose={() => {
                    disc[1].close();
                    form.clearErrors();
                }}        >
                <Stack gap="sm">
                    <CustomTextInput label="Mã nhóm" {...form.getInputProps("code")} withAsterisk />
                    <CustomTextInput label="Tên nhóm" {...form.getInputProps("name")} withAsterisk />
                    <CustomButton
                        mt={10}
                        fullWidth
                        actionType="create"
                        onClick={async () => {
                            const result = form.validate();
                            if (!result.hasErrors) {
                                handleSubmit(form.values);
                            }
                        }}
                    />
                </Stack>
            </Modal>
        </>
    );
}

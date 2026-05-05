"use client";

import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

interface Props {
    handleUpdateWorkingGroup: Function;
    values: ICouncilGroup;
}

export default function CouncilGroupUpdateButton({ values, handleUpdateWorkingGroup }: Props) {
    const disc = useDisclosure();

    const form = useForm<ICouncilGroup>({
        initialValues: {
            code: "",
            name: ""
        },
        validate: {
            code: (value) => ((value ?? "").trim() === "" ? "Mã không được để trống" : null),
            name: (value) => ((value ?? "").trim() === "" ? "Tên không được để trống" : null),
        },
        validateInputOnBlur: true,
    });

    useEffect(() => {
        form.setValues(values);
    }, [values])

    const handleSubmit = (newValues: ICouncilGroup) => {
        handleUpdateWorkingGroup(values, newValues);
        disc[1].close();
        notifications.show({
            color: "green",
            message: "Cập nhật nhóm công tác thành công",
        });
    };

    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                title: "Chi tiết nhóm công tác"
            }}
            actionIconProps={{
                actionType: "update"
            }}
            disclosure={disc}
        >
            <CustomTextInput label="Mã nhóm" {...form.getInputProps("code")} disabled withAsterisk />
            <CustomTextInput label="Tên nhóm" {...form.getInputProps("name")} withAsterisk />
            <CustomButton
                mt={10}
                fullWidth
                actionType="update"
                onClick={async () => {
                    const result = form.validate();
                    if (!result.hasErrors) {
                        handleSubmit(form.values);
                    }
                }}
            />
        </CustomButtonModal>
    );
}

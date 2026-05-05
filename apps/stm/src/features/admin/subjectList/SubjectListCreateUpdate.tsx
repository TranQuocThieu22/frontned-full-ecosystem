'use client'

import { roomTypeService } from "@/shared/APIs/roomTypeService";
import { subjectService } from "@/shared/APIs/subjectService";
import { Subject } from "@/shared/interfaces/subject";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface Props {
    values?: Subject;
}

export default function SubjectListCreateUpdate({ values }: Props) {
    const isUpdate = !!values;

    const form = useForm<Subject>({
        mode: "uncontrolled",
        validate: {
            code: (value) => (value ? null : "Không được để trống"),
            name: (value) => (value ? null : "Không được để trống"),
            roomTypeId: (value) => (value != null && value !== 0 ? null : "Chọn tính chất phòng"),
        },
    });

    const roomTypesQuery = useCustomReactQuery({
        queryKey: ["roomTypes"],
        axiosFn: () => roomTypeService.getAll(),
    });

    useEffect(() => {
        if (!values) return;
        form.setValues(values);
        form.setInitialValues(values);
    }, [values]);

    return (
        <CustomButtonCreateUpdate
            form={form}
            isUpdate={isUpdate}
            modalProps={{ size: "lg", title: "Chi tiết môn học" }}
            onSubmit={(values) => {
                if (isUpdate) return subjectService.update(values);
                return subjectService.create(values);
            }}
        >
            <CustomTextInput withAsterisk label="Mã môn học" {...form.getInputProps("code")} readOnly={isUpdate} />
            <CustomTextInput withAsterisk label="Tên môn học" {...form.getInputProps("name")} />
            <CustomNumberInput label="Số tiết" min={0} {...form.getInputProps("classPeriodNumber")} />
            <CustomNumberInput label="Số giờ" min={0} {...form.getInputProps("hours")} />
            <CustomSelectAPI
                withAsterisk
                label="Tính chất phòng"
                query={roomTypesQuery}
                value={form.getValues().roomTypeId}
                onChange={(value, item) => {
                    form.setFieldValue("roomTypeId", value)
                }}
            />
            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}

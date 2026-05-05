'use client'

import { certificateService } from "@/shared/APIs/certificateService";
import { programService } from "@/shared/APIs/programService";
import { programTypeService } from "@/shared/APIs/programTypeService";
import { skillCenterService } from "@/shared/APIs/skillCenterService";
import { Program } from "@/shared/interfaces/program";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Checkbox, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface Props {
    values?: Program;
}

export default function ProgramListCreateUpdate({ values }: Props) {
    const isUpdate = !!values;

    const form = useForm<Program>({
        mode: "uncontrolled",
        validate: {
            code: (value) => (value ? null : "Không được để trống"),
            name: (value) => (value ? null : "Không được để trống"),
            programTypeId: (value) => (value ? null : "Không được để trống"),
        },
    });

    const programTypeQuery = useCustomReactQuery({
        queryKey: ["programTypes"],
        axiosFn: () => programTypeService.getAll(),
    });

    const skillCenterQuery = useCustomReactQuery({
        queryKey: ["skillCenters"],
        axiosFn: () => skillCenterService.getAll(),
    });

    const certificateQuery = useCustomReactQuery({
        queryKey: ["certificates"],
        axiosFn: () => certificateService.getAll(),
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
            modalProps={{ size: "lg", title: "Chi tiết danh mục chương trình" }}
            onSubmit={(values) => {
                if (isUpdate) return programService.update(values);
                return programService.create(values);
            }}
        >
            <SimpleGrid cols={2}>
                <CustomTextInput
                    withAsterisk
                    label="Mã chương trình"
                    {...form.getInputProps("code")}
                    readOnly={isUpdate}
                />
                <CustomTextInput withAsterisk label="Tên chương trình" {...form.getInputProps("name")} />

                <CustomSelectAPI
                    withAsterisk
                    label="Loại chương trình"
                    query={programTypeQuery}
                    value={form.getValues().programTypeId}
                    onChange={(value) => form.setFieldValue("programTypeId", value)}
                />
                <CustomSelectAPI
                    label="Trung tâm"
                    query={skillCenterQuery}
                    value={form.getValues().skillCenterId}
                    onChange={(value) => form.setFieldValue("skillCenterId", value)}
                />

                <CustomSelectAPI
                    label="Chứng chỉ"
                    query={certificateQuery}
                    value={form.getValues().certificateId}
                    onChange={(value) => form.setFieldValue("certificateId", value)}
                />

                <CustomNumberInput label="Tổng số tiết" min={0} {...form.getInputProps("totalClassPeriodNumber")} />
                <CustomNumberInput label="Tổng số giờ" min={0} {...form.getInputProps("totalHours")} />
                <CustomNumberInput label="Học phí (gợi ý)" min={0} thousandSeparator {...form.getInputProps("price")} />

                <Checkbox
                    label="Có tổ chức thi"
                    {...form.getInputProps("isTesting", { type: "checkbox" })}
                />
                <Checkbox
                    label="Dừng đào tạo"
                    {...form.getInputProps("isCancel", { type: "checkbox" })}
                />
            </SimpleGrid>

            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}


import { levelService } from "@/shared/APIs/levelService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { SRMType } from "@/shared/interfaces/SRMType";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function TopicTypeListCreateOrUpdate({ initValues }: { initValues?: SRMType }) {
    const form = useForm<SRMType>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value ? null : 'Vui lòng nhập mã loại đề tài',
            name: (value) => value ? null : 'Vui lòng nhập tên loại đề tài',
            srmLevelId: (value) => value ? null : 'Vui lòng chọn cấp đề tài',
            workingHours: (value) => value ? null : 'Vui lòng nhập số giờ',
            // point: (value) => value ? null : 'Vui lòng nhập số điểm',
        }
    });

    const levelActiceQuery = useCustomReactQuery({
        queryKey: ['levelActiceQuery'],
        axiosFn: () => {
            return levelService.getAllIsActive()
        },
    })

    function handleSubmit(formValues: SRMType) {
        if (initValues) return SRMTypeService.update({
            ...formValues,
            srmLevel: undefined,
        })
        return SRMTypeService.create(formValues)
    }

    useEffect(() => {
        form.setInitialValues({
            ...initValues,
            note: initValues?.note || "",
        })
        form.setValues({
            ...initValues,
            note: initValues?.note || "",
        })
    }, [initValues])


    return (
        <CustomButtonCreateUpdate
            onSubmit={handleSubmit}
            form={form}
            isUpdate={!!initValues}
        >
            <CustomTextInput
                label="Mã loại đề tài"
                withAsterisk
                readOnly={!!initValues}
                {...form.getInputProps("code")}
            />
            <CustomTextInput
                label="Tên loại đề tài"
                withAsterisk
                {...form.getInputProps("name")}
            />
            <CustomSelect
                label="Cấp đề tài"
                isLoading={levelActiceQuery.isLoading}
                withAsterisk
                value={form.values.srmLevelId?.toString() || null}
                data={levelActiceQuery.data?.map(item => ({ label: item.name!, value: item.id!.toString() })) || []}
                {...form.getInputProps("srmLevelId")}
                onChange={(value) => form.setFieldValue("srmLevelId", Number(value) || 1)}

            />
            <CustomNumberInput
                max={undefined}
                label="Số giờ"
                withAsterisk
                {...form.getInputProps("workingHours")}
            />
            <CustomNumberInput
                label="Số điểm"
                {...form.getInputProps("point")}
            />
            <CustomTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
            <CustomCheckbox
                label="Không sử dụng"
                defaultChecked={form.values.isDeactivate || false}
                {...form.getInputProps("isDeactivate")}
            />
        </CustomButtonCreateUpdate >
    );
}

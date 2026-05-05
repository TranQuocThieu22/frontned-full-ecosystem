'use client'
import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { SRMAwardType } from "@/shared/interfaces/SRMAwardType";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function AwardTypeListCreateOrUpdate({ initValues }: { initValues?: SRMAwardType }) {

    const form = useForm<SRMAwardType>({
        mode: "uncontrolled",
        validate: {
            code: (value) => !value ? "Mã loại giải thưởng là bắt buộc" : null,
            name: (value) => !value ? "Tên loại giải thưởng là bắt buộc" : null,
        }
    });

    const awardLevelQuery = useCustomReactQuery({
        queryKey: ['awardLevelQuery'],
        axiosFn: () => AwardLevelService.getAllIsActive()
    });

    async function handleSubmit(formValues: SRMAwardType) {
        if (initValues) {
            return AwardTypeService.update(formValues);
        }
        return AwardTypeService.create(formValues);
    }


    useEffect(() => {
        if (!initValues) return;
        form.setInitialValues(initValues);
        form.setValues(initValues);
    }, [initValues]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                // size: "50%",
                title: initValues ? "Cập nhật loại giải thưởng" : "Thêm loại giải thưởng",
            }}
            onSubmit={handleSubmit}
            form={form}
            isUpdate={!!initValues}
        >
            <Stack>
                <CustomTextInput
                    label="Mã loại giải thưởng"
                    withAsterisk
                    readOnly={!!initValues}
                    {...form.getInputProps("code")}
                />

                <CustomNumberInput
                    label="Thứ tự hiển thị"
                    {...form.getInputProps("order")}
                />

                <CustomTextInput
                    label="Tên loại giải thưởng"
                    withAsterisk
                    {...form.getInputProps("name")}
                />

                <CustomSelect
                    label="Cấp giải thưởng"
                    placeholder="Chọn cấp giải thưởng"
                    data={
                        awardLevelQuery.data?.map((item) => ({
                            value: item.id?.toString() || "",
                            label: item.name || "",
                        })) || []
                    }
                    value={form.values.srmAwardLevelId?.toString() || null}
                    onChange={(value) =>
                        form.setFieldValue("srmAwardLevelId", Number(value) || undefined)
                    }
                />

                <CustomTextArea
                    label="Ghi chú"
                    autosize
                    minRows={3}
                    {...form.getInputProps("note")}
                />

                <CustomCheckbox
                    mt="sm"
                    label="Không sử dụng"
                    defaultChecked={form.values.isDeactivate || false}
                    {...form.getInputProps("isDeactivate")}
                />
            </Stack>
        </CustomButtonCreateUpdate>
    );
}

"use client";

import { codeFormulaService } from "@aq-fe/aq-legacy-framework/shared/APIs/codeFormulaService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CodeFormula } from "@aq-fe/aq-legacy-framework/shared/interfaces/CodeFormula";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";


type CodeFormulaCreateProps = {
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
    isSae?: boolean
};

export default function CodeFormulaCreate({
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
    isSae
}: CodeFormulaCreateProps) {
    const getFirstEnumKey = (enumObj?: Record<number, string>): number | undefined => {
        if (!enumObj) return undefined;
        const keys = Object.keys(enumObj).map(Number).sort((a, b) => a - b);
        return keys[0];
    };

    const form = useForm<CodeFormula>({
        initialValues: {
            code: "",
            name: "",
            prefix: "",
            suffix: "",
            length: 0,
            isNumberZeroUsed: false,
            frequency: getFirstEnumKey(repeatCycleEnum),
            objectType: getFirstEnumKey(objectTypeEnum),
            operationType: getFirstEnumKey(businessTypeEnum),
        },
        validate: {
            code: (value) => (value ? null : "Không được để trống"),
            name: (value) => (value ? null : "Không được để trống"),
            length: (value) => (value ? null : "Không được để trống"),
        },
    });

    return (
        <CustomButtonCreateUpdate
            form={form}
            onSubmit={() =>
                codeFormulaService.create({
                    ...form.values,
                    operationType: isSae ? 11 : form.values.operationType, //11 là hoạt động ngoại khóa
                    isEnabled: true,
                })
            }
        >
            <CustomTextInput
                withAsterisk
                label="Mã bộ đếm"
                {...form.getInputProps("code")}
            />

            <CustomTextInput
                withAsterisk
                label="Tên bộ đếm"
                {...form.getInputProps("name")}
            />

            {businessTypeEnum && (
                <Select
                    clearable={false}
                    label="Loại nghiệp vụ"
                    placeholder="Chọn loại nghiệp vụ"
                    data={converterUtils.enumToSelectOptions(businessTypeEnum)}
                    value={form.values.operationType?.toString()}
                    onChange={(value) =>
                        form.setFieldValue(
                            "operationType",
                            value ? Number(value) : undefined
                        )
                    }
                />
            )}

            {objectTypeEnum && (
                <Select
                    clearable={false}
                    label="Loại đối tượng"
                    placeholder="Chọn loại đối tượng"
                    data={converterUtils.enumToSelectOptions(objectTypeEnum)}
                    value={form.values.objectType?.toString()}
                    onChange={(value) =>
                        form.setFieldValue(
                            "objectType",
                            value ? Number(value) : undefined
                        )
                    }
                />
            )}

            {repeatCycleEnum && (
                <Select
                    clearable={false}
                    label="Chu kỳ lặp lại"
                    placeholder="Chọn chu kỳ lặp lại"
                    data={converterUtils.enumToSelectOptions(repeatCycleEnum)}
                    value={form.values.frequency?.toString()}
                    onChange={(value) =>
                        form.setFieldValue(
                            "frequency",
                            value ? Number(value) : undefined
                        )
                    }
                />
            )}

            <CustomTextInput label="Tiền tố" {...form.getInputProps("prefix")} />

            <CustomTextInput label="Hậu tố" {...form.getInputProps("suffix")} />

            <CustomNumberInput
                label="Chiều dài"
                {...form.getInputProps("length")}
            />

            <CustomCheckbox
                label="Có dùng số 0"
                {...form.getInputProps("isNumberZeroUsed")}
                defaultChecked={form.values.isNumberZeroUsed}
            />
        </CustomButtonCreateUpdate>
    );
}

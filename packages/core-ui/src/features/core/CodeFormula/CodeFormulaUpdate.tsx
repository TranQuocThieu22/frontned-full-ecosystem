import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { CustomActionIconUpdate } from "@aq-fe/core-ui/shared/components/button/CustomActionIconUpdate";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CodeFormula } from "@aq-fe/core-ui/shared/interfaces/CodeFormula";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";

import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useEffect } from "react";

type CodeFormulaUpdateProps = {
    data: CodeFormula;
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
    isSae?: boolean
};

export default function CodeFormulaUpdate({
    data,
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
    isSae
}: CodeFormulaUpdateProps) {
    const form = useForm<CodeFormula>({
        mode: 'uncontrolled',
        validate: {
            code: (value) => (value ? null : "Không được để trống"),
            name: (value) => (value ? null : "Không được để trống"),
            length: (value) => (value ? null : "Không được để trống"),
        },
    });

    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data]);

    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form}
            onSubmit={() => {
                const body = {
                    id: data.id,
                    code: form.values.code,
                    name: form.values.name,
                    concurrencyStamp: data.concurrencyStamp,
                    isEnabled: true,
                    operationType: form.values.operationType,
                    frequency: form.values.frequency,
                    objectType: form.values.objectType,
                    prefix: form.values.prefix,
                    suffix: form.values.suffix,
                    length: form.values.length,
                    isNumberZeroUsed: form.values.isNumberZeroUsed,
                };

                return codeFormulaService.update(body);
            }}
        >
            <CustomTextInput
                withAsterisk
                readOnly
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

            <CustomTextInput
                label="Tiền tố"
                {...form.getInputProps("prefix")}
            />

            <CustomTextInput
                label="Hậu tố"
                {...form.getInputProps("suffix")}
            />

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

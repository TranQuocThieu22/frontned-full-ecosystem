import { codeFormulaService } from "@/APIs/codeFormulaService";
import { MyActionIconUpdate } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MyCheckbox } from "@/components/Checkbox/MyCheckbox";
import { MyNumberInput } from "@/components/Inputs/NumberInput/MyNumberInput";
import { MyTextInput } from "@/core";
import { ICodeFormula } from "@/interfaces/ICodeFormula";
import { utils_converter_enumToSelectOptions } from "@/utils";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useEffect } from "react";

type CodeFormulaUpdateProps = {
    data: ICodeFormula;
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
};

export default function CodeFormulaUpdate({
    data,
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
}: CodeFormulaUpdateProps) {
    console.log('====================================');
    console.log(repeatCycleEnum);
    console.log('====================================');
    const form = useForm<ICodeFormula>({
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
        <MyActionIconUpdate
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
            <MyTextInput
                withAsterisk
                readOnly
                label="Mã bộ đếm"
                {...form.getInputProps("code")}
            />

            <MyTextInput
                withAsterisk
                label="Tên bộ đếm"
                {...form.getInputProps("name")}
            />

            {businessTypeEnum && (
                <Select
                    clearable={false}
                    label="Loại nghiệp vụ"
                    placeholder="Chọn loại nghiệp vụ"
                    data={utils_converter_enumToSelectOptions(businessTypeEnum)}
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
                    data={utils_converter_enumToSelectOptions(objectTypeEnum)}
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
                    data={utils_converter_enumToSelectOptions(repeatCycleEnum)}
                    value={form.values.frequency?.toString()}
                    onChange={(value) =>
                        form.setFieldValue(
                            "frequency",
                            value ? Number(value) : undefined
                        )
                    }
                />
            )}

            <MyTextInput
                label="Tiền tố"
                {...form.getInputProps("prefix")}
            />

            <MyTextInput
                label="Hậu tố"
                {...form.getInputProps("suffix")}
            />

            <MyNumberInput
                label="Chiều dài"
                {...form.getInputProps("length")}
            />

            <MyCheckbox
                label="Có dùng số 0"
                {...form.getInputProps("isNumberZeroUsed")}
                defaultChecked={form.values.isNumberZeroUsed}
            />
        </MyActionIconUpdate>
    );
}

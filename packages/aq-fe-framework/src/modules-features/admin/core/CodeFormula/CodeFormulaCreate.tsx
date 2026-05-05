"use client";

import { codeFormulaService } from "@/APIs/codeFormulaService";
import { MyCheckbox, MyNumberInput } from "@/components";
import { MyButtonCreate } from "@/components/Button/ButtonCRUD/MyButtonCreate";
import { MyTextInput } from "@/core";
import { ICodeFormula } from "@/interfaces/ICodeFormula";
import { utils_converter_enumToSelectOptions } from "@/utils";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";


type CodeFormulaCreateProps = {
    businessTypeEnum?: Record<number, string>;
    objectTypeEnum?: Record<number, string>;
    repeatCycleEnum?: Record<number, string>;
};

export default function CodeFormulaCreate({
    businessTypeEnum,
    objectTypeEnum,
    repeatCycleEnum,
}: CodeFormulaCreateProps) {
    const getFirstEnumKey = (enumObj?: Record<number, string>): number | undefined => {
        if (!enumObj) return undefined;
        const keys = Object.keys(enumObj).map(Number).sort((a, b) => a - b);
        return keys[0];
    };

    const form = useForm<ICodeFormula>({
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
        <MyButtonCreate
            form={form}
            onSubmit={() =>
                codeFormulaService.create({
                    ...form.values,
                    isEnabled: true,
                })
            }
        >
            <MyTextInput
                withAsterisk
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

            <MyTextInput label="Tiền tố" {...form.getInputProps("prefix")} />

            <MyTextInput label="Hậu tố" {...form.getInputProps("suffix")} />

            <MyNumberInput
                label="Chiều dài"
                {...form.getInputProps("length")}
            />

            <MyCheckbox
                label="Có dùng số 0"
                {...form.getInputProps("isNumberZeroUsed")}
                defaultChecked={form.values.isNumberZeroUsed}
            />
        </MyButtonCreate>
    );
}

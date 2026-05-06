import { Button, Grid, Group, Modal, ModalProps, Text, Tooltip } from "@mantine/core";
import { IconArrowBack, IconArrowLeft, IconArrowRight, IconPlus, IconRowRemove, IconRun } from "@tabler/icons-react";
import { DeepKeys } from "@tanstack/table-core";

import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo, useState } from "react";
import { CustomMappingDataModalUtils } from "./CustomMappingDataModalUtils";

export type FieldType = "number" | "date" | "boolean"

export interface FieldOption<T> {
    fieldKey?: (({} & string) | DeepKeys<T>);
    fieldName?: string;
    isRequired?: boolean;
    isUnique?: boolean
    excelColumKey?: string
    parseType?: FieldType;
    isSelected?: boolean
}

export interface MappingError {
    fieldKey: string;
    rawValue: string;
    description: string;
    type: "format" | "blankInRequired" | "duplicate"
}

export interface FormatResult<T> {
    rowIndex: number;
    rawData: T
    formatData?: T,
    error?: MappingError[]
}


interface CustomMappingFormatDataModalProps<T> extends ModalProps {
    fields: FieldOption<T>[]
    data?: any[]
    onContinute?: (result: FormatResult<T>[]) => void;
    onQuit?: () => void
}

export default function CustomMappingFormatDataModal<T>({
    fields,
    data,
    onContinute,
    onClose,
    onQuit,
    ...rest
}: CustomMappingFormatDataModalProps<T>) {
    const fieldsState = useState<FieldOption<T>[]>([]);

    const excelColumnKeys = useMemo(() => {
        if (!data) return []
        return data.length > 0 ? Object.keys(data[0] as object) : []
    }, [data]);

    useEffect(() => {
        if (fieldsState[0].length > 0) return;
        if (!excelColumnKeys || excelColumnKeys.length === 0) return;

        const initFieldState: FieldOption<T>[] = fields.map(field => {
            if (excelColumnKeys.includes(String(field.fieldKey))) {
                return { ...field, isSelected: true, excelColumKey: String(field.fieldKey) };
            }
            return { ...field, isSelected: true };
        });

        fieldsState[1](initFieldState);
    }, [excelColumnKeys]);

    const handleContinute = () => {
        const selectedFields = fieldsState[0].filter(item => item.isSelected && item.excelColumKey);

        if (!data || data.length === 0) {
            console.warn("Không có dữ liệu Excel");
            return;
        }
        if (fieldsState[0].filter(item => item.isRequired).some(item => !item.excelColumKey)) {
            notifications.show({
                message: "Vui lòng map",
                color: "red"
            })
            return
        }
        const validationResult: FormatResult<T>[] = [];

        data.forEach((row, rowIndex) => {
            const rawObj: any = {};
            const obj: any = {};
            const errors: MappingError[] = [];
            selectedFields.forEach(field => {
                const rawValue = row[field.excelColumKey as string];
                rawObj[field.fieldKey as string] = rawValue;
                const rawStr = rawValue != null ? String(rawValue).trim() : "";
                const isBlank = rawValue === null || rawValue === undefined || rawValue === "" || rawStr === "";
                let parsedValue: any = rawValue;
                try {
                    if (field.isRequired && isBlank) {
                        errors.push({
                            fieldKey: String(field.fieldKey),
                            rawValue,
                            type: "blankInRequired",
                            description: `Trường "${String(field.fieldKey)}(${String(field.fieldName)})" là bắt buộc nhưng bị để trống"`,
                        });
                        return
                    }
                    switch (field.parseType) {
                        case "number":
                            if (isBlank) return undefined
                            if (rawStr === "")
                                parsedValue = null;
                            else if (isNaN(Number(rawStr.replaceAll(",", ""))))
                                throw new Error(`Không thể ép "${rawValue}" sang number`);
                            else parsedValue = Number(rawStr.replaceAll(",", ""));
                            break;

                        case "boolean":
                            if (isBlank) return undefined
                            if (typeof rawValue === "boolean") parsedValue = rawValue;
                            else if (["true", "1"].includes(rawStr.toLowerCase()))
                                parsedValue = true;
                            else if (["false", "0"].includes(rawStr.toLowerCase()))
                                parsedValue = false;
                            else throw new Error(`Không thể ép "${rawValue}" sang boolean`);
                            break;
                        case "date":
                            if (isBlank) return undefined
                            if (!CustomMappingDataModalUtils.isDDMMYYYYFormat(rawStr))
                                throw new Error(`Không thể ép "${rawValue}" sang date`);
                            parsedValue = CustomMappingDataModalUtils.convertToYYYYMMDD(rawStr);
                            break;
                        // mặc định không truyền type thì là string
                        default:
                            parsedValue = rawStr;
                            break;
                    }
                    obj[field.fieldKey as string] = parsedValue;
                } catch (err: any) {
                    errors.push({
                        fieldKey: String(field.fieldKey),
                        rawValue,
                        type: "format",
                        description: err.message,
                    });
                    obj[field.fieldKey as string] = typeof rawValue === "string" ? rawValue.trim() : rawValue;
                }
            });
            validationResult.push({
                rowIndex: rowIndex + 1,
                rawData: rawObj as T,
                formatData: obj as T,
                error: errors.length > 0 ? errors : undefined, // hoặc lưu danh sách errors nếu muốn
            });
        });
        // 🧠 Kiểm tra trùng lặp cho các field có isUnique = true
        const uniqueFields = selectedFields.filter(f => f.isUnique);
        uniqueFields.forEach(uniqueField => {
            const seen = new Map<string, number[]>(); // lưu giá trị -> danh sách dòng
            validationResult.forEach(result => {
                const value = (result.formatData as any)?.[uniqueField.fieldKey as string];
                if (value == null || value === "") return;
                const key = String(value).trim().toLowerCase();
                if (!seen.has(key)) seen.set(key, [result.rowIndex]);
                else seen.get(key)!.push(result.rowIndex);
            });

            // Xử lý khi có giá trị trùng
            seen.forEach((rows, key) => {
                if (rows.length > 1) {
                    rows.forEach(rowIdx => {
                        const target = validationResult[rowIdx - 1];
                        if (!target?.error) target!.error = [];
                        target?.error.push({
                            fieldKey: String(uniqueField.fieldKey),
                            rawValue: key,
                            type: "duplicate",
                            description: `Giá trị "${key}" bị trùng trong field "${uniqueField.fieldName || uniqueField.fieldKey}"`,
                        });
                    });
                }
            });
        });

        onContinute?.(validationResult);
    };


    return (
        <Modal
            size={"130em"}
            title="Mapping dữ liệu"
            onClose={onClose}
            {...rest}
        >
            <Grid columns={13}>
                <Grid.Col span={{ base: 13, md: 6 }}>
                    <CustomFieldset title="Danh sách trường thông tin">
                        <CustomDataTable
                            enableColumnActions={false}
                            enableBottomToolbar={false}
                            renderTopToolbar={() => (
                                <Button
                                    leftSection={<IconPlus />}
                                    m={'md'}
                                    onClick={() => {
                                        const updated: FieldOption<T>[] = fieldsState[0].map(item => ({
                                            ...item,
                                            isSelected: true
                                        }))
                                        fieldsState[1](updated)
                                    }}
                                >
                                    Thêm tất cả
                                </Button>
                            )}
                            columns={[
                                {
                                    header: "Mã field",
                                    size: 130,
                                    accessorKey: "fieldKey"
                                },
                                {
                                    header: "Tên field",
                                    accessorKey: "fieldName"
                                },
                            ]}
                            data={fieldsState[0].filter(item => !item.isSelected)}
                            renderRowActions={({ row }) => (
                                <Button
                                    variant="light"
                                    leftSection={<IconArrowRight />}
                                    onClick={() => {
                                        const updated: FieldOption<T>[] = fieldsState[0].map(item => {
                                            return item.fieldKey == row.original.fieldKey ? { ...item, isSelected: true } : item
                                        })
                                        fieldsState[1](updated)
                                    }}>
                                    Thêm
                                </Button>
                            )}
                        />
                    </CustomFieldset>
                </Grid.Col>
                <Grid.Col span={{ base: 13, md: 7 }}>
                    <CustomFieldset title="Trường đã chọn & cột map">
                        <CustomDataTable
                            enableColumnActions={false}
                            enableBottomToolbar={false}
                            renderTopToolbar={({ table }) => (
                                <Button
                                    m={'md'}
                                    color="red"
                                    leftSection={<IconRowRemove />}
                                    onClick={() => {
                                        const updated: FieldOption<T>[] = fieldsState[0].map(item => (
                                            item.isRequired ? item : { ...item, isSelected: false }
                                        ))
                                        fieldsState[1](updated)
                                    }}
                                >
                                    Bỏ tất cả
                                </Button>
                            )}
                            data={fieldsState[0].filter(item => item.isSelected == true)}
                            columns={[
                                {
                                    header: "Mã field",
                                    accessorKey: "fieldKey",
                                    accessorFn: (row) => (
                                        <Group gap={2}>
                                            <Text>{row.fieldKey}</Text>
                                            {row.isRequired && <Text c={'red'}>*</Text>}
                                            {row.isUnique && <Text c={'red'}>!</Text>}
                                        </Group>
                                    ),
                                    size: 130
                                },
                                {
                                    header: "Tên field",
                                    accessorKey: "fieldName",
                                    size: 150
                                },
                                {
                                    header: "Cột map",
                                    size: 150,
                                    accessorFn: (row) => (
                                        <CustomSelect
                                            data={excelColumnKeys}
                                            value={row.excelColumKey}
                                            onChange={(value) => {
                                                const updated: FieldOption<T>[] = fieldsState[0].map(item => (
                                                    item.fieldKey == row.fieldKey ? { ...item, excelColumKey: String(value) } : item
                                                ))
                                                fieldsState[1](updated)
                                            }}
                                        />
                                    )
                                },
                            ]}

                            renderRowActions={({ row }) => (
                                <CustomCenterFull>
                                    <Tooltip
                                        hidden={!row.original.isRequired}
                                        label={row.original.isRequired && "Field bắt buộc không thể bỏ"}
                                    >
                                        <Button
                                            leftSection={<IconArrowLeft />}
                                            variant="light"
                                            color="red"
                                            disabled={row.original.isRequired}
                                            onClick={() => {
                                                const updated = fieldsState[0].map(item => (
                                                    item.fieldKey == row.original.fieldKey ? { ...item, isSelected: false } : item
                                                ))
                                                fieldsState[1](updated)
                                            }}
                                        >
                                            Bỏ
                                        </Button>
                                    </Tooltip>
                                </CustomCenterFull>
                            )}
                        />
                    </CustomFieldset>
                </Grid.Col>
            </Grid>
            <CustomFlexEnd>
                <Button color="green" leftSection={<IconArrowBack />} onClick={() => { onClose() }} >Quay lại</Button>
                <Button variant="gradient" leftSection={<IconArrowRight />} onClick={handleContinute} >Tiếp tục</Button>
                <Button
                    onClick={onQuit}
                    color="red"
                    leftSection={<IconRun />}>
                    Thoát
                </Button>
            </CustomFlexEnd>
        </Modal>
    )
}



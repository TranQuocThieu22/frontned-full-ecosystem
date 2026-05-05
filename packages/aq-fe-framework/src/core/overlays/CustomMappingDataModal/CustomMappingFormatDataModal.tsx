import { MyCenterFull, MyDataTable, MyFieldset, MySelect } from "@/components";
import { Button, Grid, Group, Modal, ModalProps, Text, Tooltip } from "@mantine/core";
import { IconArrowBack, IconArrowLeft, IconArrowRight, IconPlus, IconRowRemove, IconRun } from "@tabler/icons-react";
import { DeepKeys } from "@tanstack/table-core";

import { MyFlexEnd } from "@/core/layout/MyFlexEnd";
import { useEffect, useMemo, useState } from "react";
import { CustomMappingDataModalUtils } from "./CustomMappingDataModalUtils";

export type FieldType = "number" | "date" | "boolean"

export interface FieldOption<T> {
    key?: (({} & string) | DeepKeys<T>);
    name?: string;
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
            if (excelColumnKeys.includes(String(field.key))) {
                return { ...field, isSelected: true, excelColumKey: String(field.key) };
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
        if (fieldsState[0].some(item => !item.excelColumKey)) {
            alert("Vui lòng map")
            return
        }
        const validationResult: FormatResult<T>[] = [];

        data.forEach((row, rowIndex) => {
            const rawObj: any = {};
            const obj: any = {};
            const errors: MappingError[] = [];
            selectedFields.forEach(field => {
                const rawValue = row[field.excelColumKey as string];
                rawObj[field.key as string] = rawValue;
                let parsedValue: any = rawValue;
                try {
                    if (field.isRequired && (parsedValue === null || parsedValue === undefined || parsedValue === "")) {
                        errors.push({
                            fieldKey: String(field.key),
                            rawValue,
                            type: "blankInRequired",
                            description: `Trường "${String(field.key)}(${String(field.name)})" là bắt buộc nhưng bị để trống"`,
                        });
                        return
                    }
                    switch (field.parseType) {
                        case "number":
                            if (!rawValue) return undefined
                            if (rawValue === null || rawValue === undefined || rawValue === "")
                                parsedValue = null;
                            else if (isNaN(Number(rawValue.replaceAll(",", ""))))
                                throw new Error(`Không thể ép "${rawValue}" sang number`);
                            else parsedValue = Number(rawValue.replaceAll(",", ""));
                            break;

                        case "boolean":
                            if (!rawValue) return undefined
                            if (typeof rawValue === "boolean") parsedValue = rawValue;
                            else if (["true", "1"].includes(String(rawValue).toLowerCase()))
                                parsedValue = true;
                            else if (["false", "0"].includes(String(rawValue).toLowerCase()))
                                parsedValue = false;
                            else throw new Error(`Không thể ép "${rawValue}" sang boolean`);
                            break;
                        case "date":
                            if (!rawValue) return undefined
                            if (!CustomMappingDataModalUtils.isDDMMYYYYFormat(rawValue))
                                throw new Error(`Không thể ép "${rawValue}" sang date`);
                            parsedValue = CustomMappingDataModalUtils.convertToYYYYMMDD(rawValue);
                            break;
                        // mặc định không truyền type thì là string
                        default:
                            parsedValue = rawValue != null ? String(rawValue) : "";
                            break;
                    }
                    obj[field.key as string] = parsedValue;
                } catch (err: any) {
                    errors.push({
                        fieldKey: String(field.key),
                        rawValue,
                        type: "format",
                        description: err.message,
                    });
                    obj[field.key as string] = rawValue;
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
                const value = (result.formatData as any)?.[uniqueField.key as string];
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
                        if (!target.error) target.error = [];
                        target.error.push({
                            fieldKey: String(uniqueField.key),
                            rawValue: key,
                            type: "duplicate",
                            description: `Giá trị "${key}" bị trùng trong field "${uniqueField.name || uniqueField.key}"`,
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
                    <MyFieldset title="Danh sách trường thông tin">
                        <MyDataTable
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
                                    accessorKey: "key"
                                },
                                {
                                    header: "Tên field",
                                    accessorKey: "name"
                                },
                            ]}
                            data={fieldsState[0].filter(item => !item.isSelected)}
                            renderRowActions={({ row }) => (
                                <Button
                                    variant="light"
                                    leftSection={<IconArrowRight />}
                                    onClick={() => {
                                        const updated: FieldOption<T>[] = fieldsState[0].map(item => {
                                            return item.key == row.original.key ? { ...item, isSelected: true } : item
                                        })
                                        fieldsState[1](updated)
                                    }}>
                                    Thêm
                                </Button>
                            )}
                        />
                    </MyFieldset>
                </Grid.Col>
                <Grid.Col span={{ base: 13, md: 7 }}>
                    <MyFieldset title="Trường đã chọn & cột map">
                        <MyDataTable
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
                                    accessorKey: "key",
                                    accessorFn: (row) => (
                                        <Group gap={2}>
                                            <Text>{row.key}</Text>
                                            {row.isRequired && <Text c={'red'}>*</Text>}
                                            {row.isUnique && <Text c={'red'}>!</Text>}
                                        </Group>
                                    ),
                                    size: 130
                                },
                                {
                                    header: "Tên field",
                                    accessorKey: "name",
                                    size: 150
                                },
                                {
                                    header: "Cột map",
                                    size: 150,
                                    accessorFn: (row) => (
                                        <MySelect
                                            data={excelColumnKeys}
                                            value={row.excelColumKey}
                                            onChange={(value) => {
                                                const updated: FieldOption<T>[] = fieldsState[0].map(item => (
                                                    item.key == row.key ? { ...item, excelColumKey: String(value) } : item
                                                ))
                                                fieldsState[1](updated)
                                            }}
                                        />
                                    )
                                },
                            ]}

                            renderRowActions={({ row }) => (
                                <MyCenterFull>
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
                                                    item.key == row.original.key ? { ...item, isSelected: false } : item
                                                ))
                                                fieldsState[1](updated)
                                            }}
                                        >
                                            Bỏ
                                        </Button>
                                    </Tooltip>
                                </MyCenterFull>
                            )}
                        />
                    </MyFieldset>
                </Grid.Col>
            </Grid>
            <MyFlexEnd>
                <Button color="green" leftSection={<IconArrowBack />} onClick={() => { onClose() }} >Quay lại</Button>
                <Button variant="gradient" leftSection={<IconArrowRight />} onClick={handleContinute} >Tiếp tục</Button>
                <Button
                    onClick={onQuit}
                    color="red"
                    leftSection={<IconRun />}>
                    Thoát
                </Button>
            </MyFlexEnd>
        </Modal>
    )
}



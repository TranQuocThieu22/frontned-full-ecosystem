"use client"

import { MyButton } from "@/core";
import CustomExtractFileDataModal from "@/core/overlays/CustomExtractFileDataModal";
import CustomMappingFormatDataModal, { FieldOption, FieldType, FormatResult } from "@/core/overlays/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useMyReactMutation } from "@/hooks";
import { IAccount } from "@/interfaces";
import { MyApiResponse } from "@/shared/lib/createBaseApi";
import { IExcelColumnConfig, utils_excel } from "@/utils-v2";
import { Modal, useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { Workbook } from "exceljs";
import { isObject } from "lodash";
import { useState } from "react";
import CustomDataValidaionResultModal, { DataValidationSummary } from "../overlays/CustomDataValidaionResultModal";
import CustomValidateResultDetail from "../overlays/CustomValidateResultDetail";


interface CustomButtonImportProps<T> {
    fields: FieldOption<T>[]
    fileName: string,
    onPrepareWorkbook?: (workbook: Workbook) => void,
    onSubmit: (values: T[]) => Promise<AxiosResponse<MyApiResponse<T[]>>> | false | void
}

export function CustomButtonImport<T>({
    fields,
    fileName,
    onPrepareWorkbook,
    onSubmit
}: CustomButtonImportProps<T>) {
    const mutation = useMyReactMutation({
        mutationType: "import",
        axiosFn: (values: Promise<AxiosResponse<MyApiResponse<T>>>) => {
            return values
        },
        options: {
            onError: (error) => {
                let parsed: MyApiResponse<T> | null;
                try {
                    parsed = JSON.parse(error.message);
                } catch {
                    parsed = null;
                }
                notifications.show({
                    title: "Không thể thực hiện",
                    message: JSON.stringify(isObject(parsed?.data) ? parsed?.data : "Lỗi không xác định"),
                    color: "red",
                })
            },
            onSuccess: () => {
                stack.closeAll()
            }
        }
    })
    const stack = useModalsStack(['extract', 'mapping', 'validateResult', 'validateResultDetail'])
    const extractDataState = useState<any[]>()
    const mappingResultState = useState<FormatResult<T>[]>()
    const valitaionSummaryState = useState<DataValidationSummary<T>>()

    // ✅ Chỉnh lại fields: nếu field là 'code' thì luôn isRequired = true, isUnique = true
    const finalFields = fields.map(field => {
        if (field.isRequired == null) {
            field.isRequired = String(field.key).toLowerCase() === "code";
        }
        if (field.isUnique == null) {
            field.isUnique = String(field.key).toLowerCase() === "code";
        }
        return field;
    });
    return (
        <Modal.Stack>
            <MyButton actionType="import" onClick={() => stack.open("extract")} />
            <CustomExtractFileDataModal
                handleExportStructure={async () => {
                    const workbook = new Workbook()
                    await utils_excel.addSheet({
                        config: finalFields.map(field => ({
                            fieldKey: field.key,
                            fieldName: field.name + ` [${getFieldTypeDescription(field.parseType)}]`,
                            isRequired: field.isRequired,
                            isUnique: field.isUnique
                        }) as IExcelColumnConfig<IAccount>),
                        data: [],
                        sheetName: "Danh sách dữ liệu",
                        workbook: workbook
                    })
                    await onPrepareWorkbook?.(workbook)
                    await utils_excel.download({ workbook, name: fileName })
                }}
                onContinute={(values) => {
                    extractDataState[1](values)
                    stack.open("mapping")
                }}
                {...stack.register("extract")}
            />
            <CustomMappingFormatDataModal
                {...stack.register("mapping")}
                data={extractDataState[0]}
                fields={finalFields}
                onQuit={stack.closeAll}
                onContinute={(result) => {
                    stack.open("validateResult")
                    mappingResultState[1](result)
                }}
            />
            <CustomDataValidaionResultModal
                modalStack={stack}
                onViewDetail={(result) => {
                    valitaionSummaryState[1](result)
                }}
                formatResult={mappingResultState[0]}
                onExecute={(finalValues) => {
                    const result = onSubmit(finalValues)
                    if (result == false) return
                    mutation.mutate(result as Promise<AxiosResponse<MyApiResponse<T>, any>>);
                }}
                isLoading={mutation.isPending}
                {...stack.register("validateResult")}
            />
            <CustomValidateResultDetail
                fields={finalFields}
                dataSummary={valitaionSummaryState[0]}
                {...stack.register("validateResultDetail")}
            />

        </Modal.Stack>
    )
}


function getFieldTypeDescription(fieldType?: FieldType) {
    if (fieldType == "boolean") return "Kiểu logic (0 = Sai, 1 = Đúng)"
    if (fieldType == "date") return "Kiểu chuỗi"
    if (fieldType == "number") return "Kiểu số nguyên"
    return "Kiểu chuỗi"
}
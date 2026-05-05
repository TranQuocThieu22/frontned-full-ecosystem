"use client"

import CustomExtractFileDataModal from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomExtractFileDataModal";
import CustomMappingFormatDataModal, { FieldOption, FieldType, FormatResult } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IExcelColumnConfig, excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Modal, useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { Workbook } from "exceljs";
import { isObject } from "lodash";
import { useState } from "react";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";
import CustomDataValidaionResultModal, { DataValidationSummary } from "./CustomDataValidaionResultModal";
import CustomValidateResultDetail from "./CustomValidateResultDetail";


export interface CustomButtonImportProps<T> {
    fields: FieldOption<T>[]
    fileName?: string,
    onPrepareWorkbook?: (workbook: Workbook) => void,
    onSubmit?: (values: T[]) => Promise<AxiosResponse<CustomApiResponse<T[]>>> | false | true | void
    buttonProps?: CustomButtonProps
}

export function CustomButtonImport<T>({
    fields,
    fileName,
    onPrepareWorkbook,
    onSubmit,
    buttonProps
}: CustomButtonImportProps<T>) {
    const mutation = useCustomReactMutation({
        mutationType: "import",
        axiosFn: (values: Promise<AxiosResponse<CustomApiResponse<T>>>) => {
            return values
        },
        enableDefaultError: false,
        options: {
            onError: (error) => {
                let parsed: CustomApiResponse<T> | null;
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
            field.isRequired = String(field.fieldKey).toLowerCase() === "code";
        }
        if (field.isUnique == null) {
            field.isUnique = String(field.fieldKey).toLowerCase() === "code";
        }
        return field;
    });
    return (
        <Modal.Stack>
            <CustomButton actionType="import" onClick={() => stack.open("extract")} {...buttonProps} />
            <CustomExtractFileDataModal
                handleExportStructure={async () => {
                    const workbook = new Workbook()
                    await excelUtils.addSheet({
                        config: finalFields.map(field => ({
                            fieldKey: field.fieldKey,
                            fieldName: field.fieldName + ` [${getFieldTypeDescription(field.parseType)}]`,
                            isRequired: field.isRequired,
                            isUnique: field.isUnique
                        }) as IExcelColumnConfig<User>),
                        data: [],
                        sheetName: "Danh sách dữ liệu",
                        workbook: workbook
                    })
                    await onPrepareWorkbook?.(workbook)
                    await excelUtils.download({ workbook, name: fileName || "Cấu trúc import" })
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
                    if (!onSubmit) return
                    const result = onSubmit(finalValues)
                    if (result == false) return
                    if (result == true) {
                        notifications.show({
                            message: "Import thành công"
                        })
                        stack.closeAll()
                        return
                    }
                    mutation.mutate(result as Promise<AxiosResponse<CustomApiResponse<T>, any>>);
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
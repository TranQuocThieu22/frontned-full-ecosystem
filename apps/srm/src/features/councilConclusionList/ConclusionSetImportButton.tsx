"use client";

import { conclusionService } from "@/shared/APIs/conclusionService";
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";
import { useState } from "react";
import { ErrorModalImportMessage } from "../reviewCommitteeSetup/ComponentShared/ErrorModalImportMessage";

const config: IExcelColumnConfig<SRMConclusionSet>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã bộ kết luận",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên bộ kết luận",
        isRequired: true,
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
    {
        fieldKey: "isDeactivateNumber",
        fieldName: "Không sử dụng (Xem chú thích Danh sách trạng thái không sử dụng)",
        isRequired: false,
    }
];

interface I_IsDeactivateConfig {
    isDeactivate: number,
    label: string
}

const isDeactivateValueConfig: IExcelColumnConfig<I_IsDeactivateConfig>[] = [
    {
        fieldKey: "isDeactivate",
        fieldName: "Giá trị",
        isRequired: false,
    },
    {
        fieldKey: "label",
        fieldName: "Tiêu đề",
        isRequired: false,
    },
];

function convertErrorsToMessages(errors: Record<string, string>, body: SRMConclusionSet[]): string[] {
    return Object.entries(errors).map(([key, value]) => {
        // lấy index từ key: "[0].Code" => 0
        const match = key.match(/\[(\d+)\]/);
        const index = match ? parseInt(match[1] || "", 10) : 0;
        const code = body[index]?.code || "";
        return `Mã ${code} ➝ ${value}`;
    });
}

function checkDataImport<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    requiredFields: (keyof T)[],
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        // kiểm tra field bắt buộc
        const missing = requiredFields.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }

        // kiểm tra trùng key trong menuData import
        const value = item[key];
        if (map.has(value)) {
            resultError.push(`${label} ${value} ➝ bị trùng lặp trong file import`);
            return;
        } else {
            map.set(value, idx);
        }

        // chỉ push nếu item hợp lệ
        finalValues.push(transform(item));
    });

    return { finalValues, resultError };
}


export default function ConclusionSetImportButton() {
    const [opened, setOpened] = useState(false);
    const [messages, seMessages] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const importMutation = useMutation({
        mutationFn: (body: SRMConclusionSet[]) => conclusionService.createOrUpdateList(body),
        onSuccess: (response, body) => {
            if (response.data.isSuccess === 0) {
                const message = convertErrorsToMessages(response.data.data as any, body);
                seMessages(message);
                setOpened(true);
            } else {
                queryClient.invalidateQueries({ queryKey: ['ConclusionSetList'] });
                stack.closeAll();
                notifications.show({
                    color: "green",
                    message: "Import dữ liệu thành công"
                })
            }
        },
        onError: () => {
            notifications.show({
                color: "red",
                message: "Đã có lỗi xảy ra!"
            })
        }
    });

    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMConclusionSet>({
            workbook: workbook,
            sheetName: "Danh mục bộ kết luận hội đồng",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<I_IsDeactivateConfig>({
            workbook: workbook,
            sheetName: "Danh sách trạng thái không sử dụng",
            data: [
                {
                    isDeactivate: 1,
                    label: "Không sử dụng",
                },
                {
                    isDeactivate: 0,
                    label: "Sử dụng",
                },
            ],
            config: isDeactivateValueConfig,
        });
        excelUtils.download({ name: "Mẫu import bộ kết luận hội đồng", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                isLoading={importMutation.isPending}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(values: SRMConclusionSet[]) => {
                    const { finalValues, resultError } = checkDataImport(values, "code", "Mã",
                        item => ({
                            ...item,
                            isDeactivate: item.isDeactivateNumber === 1
                        }),
                        ["code", "name"]
                    );
                    if (resultError.length !== 0) {
                        seMessages(resultError);
                        setOpened(true);
                        return;
                    }
                    importMutation.mutate(finalValues);
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <ErrorModalImportMessage
                opened={opened}
                onClose={() => setOpened(false)}
                messages={messages}
            />
        </>
    );
}

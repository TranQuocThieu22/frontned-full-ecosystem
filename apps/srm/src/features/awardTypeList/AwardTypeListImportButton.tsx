"use client";

import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { SRMAwardType } from "@/shared/interfaces/SRMAwardType";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";
import { useState } from "react";
import { ErrorModalImportMessage } from "../reviewCommitteeSetup/ComponentShared/ErrorModalImportMessage";

// ⚙️ Cấu hình cột dữ liệu trong file import
const config: IExcelColumnConfig<SRMAwardType & { isDeactivateNumber?: number }>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã loại giải thưởng",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên loại giải thưởng",
        isRequired: true,
    },
    {
        fieldKey: "srmAwardLevelCode",
        fieldName: "Mã cấp giải thưởng (Xem sheet Danh sách cấp giải thưởng)",
        isRequired: true,
    },
    {
        fieldKey: "order",
        fieldName: "Thứ tự hiển thị",
        isRequired: false
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
    {
        fieldKey: "isDeactivateNumber",
        fieldName: "Không sử dụng (Xem sheet Danh sách trạng thái không sử dụng)",
        isRequired: false,
    },
];

// ⚙️ Sheet cấu hình trạng thái “Không sử dụng”
interface I_IsDeactivateConfig {
    isDeactivate: string;
    label: string;
}

const isDeactivateValueConfig: IExcelColumnConfig<I_IsDeactivateConfig>[] = [
    { fieldKey: "isDeactivate", fieldName: "Giá trị", isRequired: false },
    { fieldKey: "label", fieldName: "Tiêu đề", isRequired: false },
];

// ⚙️ Sheet cấu hình danh sách cấp giải thưởng
interface I_AwardLevel {
    code: string;
    name: string;
}

const awardLevelValueConfig: IExcelColumnConfig<I_AwardLevel>[] = [
    { fieldKey: "code", fieldName: "Mã cấp giải thưởng", isRequired: false },
    { fieldKey: "name", fieldName: "Tên cấp giải thưởng", isRequired: false },
];

// ⚙️ Hàm chuyển lỗi backend -> message hiển thị
function convertErrorsToMessages(errors: Record<string, string>, body: SRMAwardType[]): string[] {
    return Object.entries(errors).map(([key, value]) => {
        const match = key.match(/\[(\d+)\]/);
        const index = match ? parseInt(match[1] || "", 10) : 0;
        const code = body[index]?.code || "";
        return `Mã ${code} ➝ ${value}`;
    });
}

// ⚙️ Kiểm tra dữ liệu nhập (bắt buộc, trùng mã)
function checkDataImport<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    requiredFields: (keyof T)[]
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        const missing = requiredFields.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1})`);
            return;
        }

        const value = item[key];
        if (map.has(value)) {
            resultError.push(`${label} ${value} ➝ bị trùng lặp`);
            return;
        } else {
            map.set(value, idx);
        }

        finalValues.push(transform(item));
    });

    return { finalValues, resultError };
}

export default function AwardTypeListImportButton() {
    const [opened, setOpened] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const stack = useModalsStack<ModalImportId>([]);

    // 🧾 Query danh sách cấp giải thưởng
    const awardLevelQuery = useCustomReactQuery({
        queryKey: ['awardLevelQuery'],
        axiosFn: () => AwardLevelService.getAllIsActive()
    });

    // 🧩 Mutation import
    const importMutation = useMutation({
        mutationFn: (body: SRMAwardType[]) => AwardTypeService.createOrUpdateList(body),
        onSuccess: (response, body) => {
            if (response.data.isSuccess === 0) {
                const message = convertErrorsToMessages(response.data.data as any, body);
                setMessages(message);
                setOpened(true);
            } else {
                queryClient.invalidateQueries({ queryKey: ["awardTypeQuery"] });
                stack.closeAll();
                notifications.show({
                    color: "green",
                    message: "Import dữ liệu thành công",
                });
            }
        },
        onError: () => {
            notifications.show({
                color: "red",
                message: "Đã có lỗi xảy ra khi import dữ liệu!",
            });
        },
    });

    // 🧾 Export file mẫu
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        // Sheet chính
        await excelUtils.addSheet({
            workbook,
            sheetName: "Danh mục loại giải thưởng",
            data: [],
            config,
        });

        // Sheet trạng thái sử dụng
        await excelUtils.addSheet<I_IsDeactivateConfig>({
            workbook,
            sheetName: "Danh sách trạng thái không sử dụng",
            data: [
                { isDeactivate: "TRUE", label: "Không sử dụng" },
                { isDeactivate: "FALSE", label: "Sử dụng" },
            ],
            config: isDeactivateValueConfig,
        });

        // Sheet danh sách cấp giải thưởng
        const awardLevelData = awardLevelQuery.data?.map((item: any) => ({
            code: item.code,
            name: item.name,
        })) ?? [];

        await excelUtils.addSheet<I_AwardLevel>({
            workbook,
            sheetName: "Danh sách cấp giải thưởng",
            data: awardLevelData,
            config: awardLevelValueConfig,
        });

        excelUtils.download({ name: "Mẫu import loại giải thưởng", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired,
                }))}
                isLoading={importMutation.isPending}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={async (values: SRMAwardType[]) => {
                    const awardLevelResponse = await AwardLevelService.getAll();
                    const awardLevelList = awardLevelResponse.data.data || [];
                    const awardLevelMap = Object.fromEntries(
                        awardLevelList.map((lvl: any) => [lvl.code, lvl.id])
                    );

                    const mappedValues = values.map(item => ({
                        ...item,
                        srmAwardLevelId: item.srmAwardLevelCode
                            ? awardLevelMap[item.srmAwardLevelCode] : null,
                    }));


                    const { finalValues, resultError } = checkDataImport(
                        mappedValues,
                        "code",
                        "Mã loại giải thưởng",
                        item => ({
                            ...item,
                            isDeactivate: item.isDeactivate,
                        }),
                        ["code", "name", "srmAwardLevelId"]
                    );

                    if (resultError.length !== 0) {
                        setMessages(resultError);
                        setOpened(true);
                        return;
                    }

                    importMutation.mutate(finalValues);
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <ErrorModalImportMessage opened={opened} onClose={() => setOpened(false)} messages={messages} />
        </>
    );
}

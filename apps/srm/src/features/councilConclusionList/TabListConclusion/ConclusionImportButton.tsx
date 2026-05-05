"use client";

import { ErrorModalImportMessage } from "@/features/reviewCommitteeSetup/ComponentShared/ErrorModalImportMessage";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";
import { useState } from "react";

interface Props {
    srmConclusionSetId?: number,
    handleCreateListConclusion: Function,
    listConclusionCurrent: SRMConclusion[]
}

const config: IExcelColumnConfig<SRMConclusion>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã kết luận",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên kết luận",
        isRequired: true,
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
    {
        fieldKey: "color",
        fieldName: "Màu sắc hiển thị (Mã màu hệ HEX/RGB/HSL/Tên màu HTML)",
        isRequired: false,
    },
    {
        fieldKey: "isPassNumber",
        fieldName: "Đạt (Xem chú thích Danh sách trạng thái đạt)",
        isRequired: false,
    }
];

interface I_IsPassConfig {
    isPass: number,
    label: string
}

const isPassValueConfig: IExcelColumnConfig<I_IsPassConfig>[] = [
    {
        fieldKey: "isPass",
        fieldName: "Giá trị",
        isRequired: false,
    },
    {
        fieldKey: "label",
        fieldName: "Tiêu đề",
        isRequired: false,
    },
];

function checkDataImport<T extends Record<string, any>>(
    values: T[],
    key: keyof T,
    label: string,
    transform: (item: T) => T,
    duplicateCheck: (item: T) => boolean,
    requiredFields: (keyof T)[],
) {
    const map = new Map<any, number>();
    const resultError: string[] = [];
    const finalValues: T[] = [];

    values.forEach((item, idx) => {
        let isValid = true;
        // kiểm tra field bắt buộc
        const missing = requiredFields.some(f => {
            const v = item[f];
            return !v || String(v).trim() === "";
        });

        if (missing) {
            resultError.push(`Thiếu thông tin bắt buộc (ở dòng thứ ${idx + 1} tính từ dòng dữ liệu bắt đầu)`);
            return;
        }

        // kiểm tra trùng mã
        if (duplicateCheck(item)) {
            resultError.push(`${label} ${item[key]} đã tồn tại`);
            isValid = false;
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
        if (isValid) {
            finalValues.push(transform(item));
        }
    });

    return { finalValues, resultError };
}

export default function ConclusionImportButton({ srmConclusionSetId, handleCreateListConclusion, listConclusionCurrent }: Props) {
    const [opened, setOpened] = useState(false);
    const [messages, seMessages] = useState<string[]>([]);

    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMConclusion>({
            workbook: workbook,
            sheetName: "Danh mục kết luận",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<I_IsPassConfig>({
            workbook: workbook,
            sheetName: "Danh sách trạng thái đạt",
            data: [
                {
                    isPass: 0,
                    label: "Không đạt",
                },
                {
                    isPass: 1,
                    label: "Đạt",
                },
            ],
            config: isPassValueConfig,
        });

        const sheet = workbook.addWorksheet("Danh sách màu gợi ý");
        sheet.columns = [
            { key: "Mã màu Hex", width: 20 },
            { key: "Mã màu RGB", width: 20 },
            { key: "Tên màu", width: 20 },
            { key: "Hiển thị", width: 20 },
        ];
        // Thêm header
        const header = sheet.addRow(["Mã màu Hex", "Mã màu RGB", "Tên màu", "Hiển thị"]);
        // Style header
        header.eachCell((cell) => {
            cell.font = { bold: true, size: 12 };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFEFEFEF" },
            };
        });
        statusColors.forEach((c, i) => {
            const rowIndex = i + 2; // +2 vì header ở dòng 1
            // Ghi dữ liệu text
            sheet.getCell(`A${rowIndex}`).value = c.hex;
            sheet.getCell(`B${rowIndex}`).value = c.rgb;
            sheet.getCell(`C${rowIndex}`).value = c.name || "";
            // Preview text với màu thật
            const previewCell = sheet.getCell(`D${rowIndex}`);
            previewCell.value = "Trạng thái";
            previewCell.font = {
                color: { argb: "FF" + c.hex.replace("#", "").toUpperCase() },
                bold: true,
            };
        });
        excelUtils.download({ name: "Mẫu import kết luận", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(values: SRMConclusion[]) => {
                    const { finalValues, resultError } = checkDataImport(values, "code", "Mã",
                        item => ({
                            ...item,
                            srmConclusionSetId: srmConclusionSetId,
                            isPass: item.isPassNumber === 1
                        }),
                        item => listConclusionCurrent.some(i => i.code === item.code),
                        ["code", "name"]
                    );
                    if (resultError.length !== 0) {
                        seMessages(resultError);
                        setOpened(true);
                        return;
                    }
                    handleCreateListConclusion(finalValues);
                    stack.closeAll();
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

const statusColors = [
    { hex: "#FF0000", rgb: "rgb(255, 0, 0)", name: "red" },           // Error
    { hex: "#DC143C", rgb: "rgb(220, 20, 60)", name: "crimson" },     // Danger
    { hex: "#FF4500", rgb: "rgb(255, 69, 0)", name: "orangered" },    // Alert
    { hex: "#FF8C00", rgb: "rgb(255, 140, 0)", name: "darkorange" },  // Warning
    { hex: "#FFA500", rgb: "rgb(255, 165, 0)", name: "orange" },      // Cảnh báo nhẹ
    { hex: "#FFD700", rgb: "rgb(255, 215, 0)", name: "gold" },        // Warning
    { hex: "#FFD65A", rgb: "rgb(255, 214, 90)", name: "" },           // Chú ý
    { hex: "#ADFF2F", rgb: "rgb(173, 255, 47)", name: "greenyellow" },// Success nhạt
    { hex: "#00FF00", rgb: "rgb(0, 255, 0)", name: "lime" },          // Success
    { hex: "#31C468", rgb: "rgb(49, 196, 104)", name: "" },           // Success custom
    { hex: "#008000", rgb: "rgb(0, 128, 0)", name: "green" },         // Success đậm
    { hex: "#00CED1", rgb: "rgb(0, 206, 209)", name: "darkturquoise" },// Info
    { hex: "#1E90FF", rgb: "rgb(30, 144, 255)", name: "dodgerblue" }, // Info chính
    { hex: "#0000FF", rgb: "rgb(0, 0, 255)", name: "blue" },          // Primary
    { hex: "#4B0082", rgb: "rgb(75, 0, 130)", name: "indigo" },       // Secondary
    { hex: "#800080", rgb: "rgb(128, 0, 128)", name: "purple" },      // Secondary
    { hex: "#A9A9A9", rgb: "rgb(169, 169, 169)", name: "darkgray" },  // Neutral
    { hex: "#808080", rgb: "rgb(128, 128, 128)", name: "gray" },      // Disabled
    { hex: "#000000", rgb: "rgb(0, 0, 0)", name: "black" },           // Text/Dark
];

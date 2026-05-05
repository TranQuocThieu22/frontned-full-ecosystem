"use client";

import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

type ImportRow = SRMAcceptanceCouncil & { meetingDateValue?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã hội đồng", isRequired: true },
    { fieldKey: "name", fieldName: "Tên hội đồng", isRequired: true },
    { fieldKey: "meetingDateValue", fieldName: "Ngày họp dự kiến (dd/MM/yyyy)", parseType: "date" },
    { fieldKey: "meetingLocation", fieldName: "Địa điểm họp" },
    { fieldKey: "meetingTime", fieldName: "Thời gian họp" },
    { fieldKey: "status", fieldName: "Trạng thái Hội đồng", parseType: "number" },
];

const statusConfig: IExcelColumnConfig<{ councilStatus: number; label: string }>[] = [
    { fieldKey: "councilStatus", fieldName: "Giá trị", isRequired: false },
    { fieldKey: "label", fieldName: "Tên giá trị", isRequired: false },
];

export default function FacultyCouncilSetupImportButton() {
    const academicYearStore = useAcademicYearStore();

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Danh sách hội đồng nghiệm thu cấp Khoa"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách trạng thái Hội đồng",
                    data: [
                        { councilStatus: 1, label: "Chờ họp" },
                        { councilStatus: 2, label: "Hoàn thành" },
                    ],
                    config: statusConfig,
                });
            }}
            onSubmit={(finalValues) => {
                const mapped = finalValues.map((item) => ({
                    ...item,
                    meetingDate: item.meetingDateValue,
                    type: EnumAcceptanceCouncilType.Faculty,
                    academicYearId: academicYearStore?.state?.academicYear?.id,
                }));
                return acceptanceCouncilService.createList(mapped);
            }}
        />
    );
}

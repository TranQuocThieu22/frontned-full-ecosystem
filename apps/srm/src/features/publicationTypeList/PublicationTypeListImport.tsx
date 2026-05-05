"use client";

import { publicationService } from "@/shared/APIs/publicationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumLabelMeasurementUnit, EnumMeasurementUnit } from "@/shared/consts/enum/EnumMeasurementUnit";
import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

type ImportRow = SRMPublicationType & { isDeactivate?: boolean; publicationGroupCode?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã loại công bố", isRequired: true },
    { fieldKey: "name", fieldName: "Tên loại công bố", isRequired: true },
    { fieldKey: "publicationGroupCode", fieldName: "Mã nhóm công bố", isRequired: true },
    { fieldKey: "measurementUnit", fieldName: "ID đơn vị tính", isRequired: true, parseType: "number" },
    { fieldKey: "convertedHour", fieldName: "Số giờ quy đổi", parseType: "number" },
    { fieldKey: "convertedScore", fieldName: "Số điểm quy đổi", parseType: "number" },
    { fieldKey: "note", fieldName: "Ghi chú" },
    { fieldKey: "isDeactivate", fieldName: "Không sử dụng", parseType: "boolean" },
];

const measurementUnitConfig: IExcelColumnConfig<{ label: string; value: string }>[] = [
    { fieldKey: "value", fieldName: "ID đơn vị tính" },
    { fieldKey: "label", fieldName: "Tên đơn vị tính" },
];

export default function PublicationTypeListImport() {
    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import danh mục loại công bố"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Đơn vị tính",
                    data: converterUtils.mapEnumToSelectData(EnumMeasurementUnit, EnumLabelMeasurementUnit),
                    config: measurementUnitConfig,
                });
            }}
            onSubmit={async (finalValues) => {
                // Lấy danh sách nhóm công bố để map từ mã nhóm -> id
                const res = await publicationService.getAll({});
                const groups: SRMPublication[] = res.data?.data || [];

                const mapped = (finalValues ?? []).map((item) => {
                    return {
                        ...item,
                        code: item.code?.toString(),
                        name: item.name?.toString(),
                        note: item.note?.toString(),
                        isDeactivate: !!item.isDeactivate,
                        // dùng mã nhóm công bố để gán srmPublicationId
                        srmPublicationId: groups.find(g => g.code === item.publicationGroupCode)?.id,
                        measurementUnit: Number(item.measurementUnit),
                        convertedHour: item.convertedHour ? Number(item.convertedHour) : undefined,
                        convertedScore: item.convertedScore ? Number(item.convertedScore) : undefined,
                    } as SRMPublicationType;
                });

                return publicationTypeService.createList(mapped);
            }}
        />
    );
}

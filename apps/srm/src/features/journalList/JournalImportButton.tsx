"use client";

import { journalService } from "@/shared/APIs/journalService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumJournalType, EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

type ImportRow = SRMJournal & { pulicationTypeCode?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã danh mục", isRequired: true },
    { fieldKey: "name", fieldName: "Tên", isRequired: true },
    { fieldKey: "type", fieldName: "Loại", isRequired: true, parseType: "number" },
    { fieldKey: "pulicationTypeCode", fieldName: "Mã loại công bố", isRequired: true },
    { fieldKey: "isbn", fieldName: "Chỉ số ISBN/ ISSN" },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

const journalTypeValueConfig: IExcelColumnConfig<{ value: string; label: string }>[] = [
    { fieldKey: "value", fieldName: "Mã" },
    { fieldKey: "label", fieldName: "Tên loại" },
];

export default function JournalImportButton() {
    const publicationTypeQuery = useCustomReactQuery({
        queryKey: ["publicationTypes"],
        axiosFn: () => publicationTypeService.getAllIsActive(),
    });

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import Tạp chí, Hội thảo, NXB"
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách loại",
                    data: converterUtils.mapEnumToSelectData(EnumJournalType, EnumLabelJournalType),
                    config: journalTypeValueConfig,
                });
            }}
            onSubmit={(values) => {
                const mapped = (values ?? []).map((item) => ({
                    code: item.code,
                    name: item.name,
                    note: item.note?.toString(),
                    isbn: item.isbn?.toString(),
                    type: item.type,
                    srmPublicationTypeId: publicationTypeQuery.data?.find(
                        (i) => i.code === item.pulicationTypeCode
                    )?.id,
                })) as SRMJournal[];

                return journalService.createList(mapped);
            }}
        />
    );
}

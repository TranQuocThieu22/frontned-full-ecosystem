"use client";

import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

const fields: FieldOption<SRMAwardLevel>[] = [
    { fieldKey: "code", fieldName: "Mã cấp giải thưởng", isRequired: true },
    { fieldKey: "name", fieldName: "Tên cấp giải thưởng", isRequired: true },
    { fieldKey: "isDeactivate", fieldName: "Không sử dụng", isRequired: true, parseType: "boolean" },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

export default function SRMAwardLevelImportButton() {
    return (
        <CustomButtonImport<SRMAwardLevel>
            fields={fields}
            fileName="Mẫu import cấp giải thưởng sinh viên nghiên cứu khoa học"
            onSubmit={(values) => AwardLevelService.createList(values)}
        />
    );
}

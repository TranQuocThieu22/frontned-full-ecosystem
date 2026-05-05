"use client";

import { publicationService } from "@/shared/APIs/publicationService";
import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

const fields: FieldOption<SRMPublication>[] = [
    { fieldKey: "code", fieldName: "Mã nhóm công bố", isRequired: true },
    { fieldKey: "name", fieldName: "Tên nhóm công bố", isRequired: true },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

export default function PublicationGroupImport() {
    return (
        <CustomButtonImport<SRMPublication>
            fields={fields}
            fileName="Danh sách nhóm công bố"
            onSubmit={(finalValues) => publicationService.createList(finalValues)}
        />
    );
}

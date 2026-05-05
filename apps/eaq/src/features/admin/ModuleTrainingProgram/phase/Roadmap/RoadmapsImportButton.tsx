"use client";

import { service_EAQRoadmap } from "@/shared/APIs/service_EAQRoadmap";
import { IRoadmap } from "@/shared/interfaces/roadmap/Roadmap";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
interface ImportProps {
    eaqPhaseId?: number,
}

export default function RoadmapImportButton({ eaqPhaseId }: ImportProps) {
    return (
        <>
            <CustomButtonImport
                fields={field}
                fileName="Mẫu import lộ trình kiểm định"
                onSubmit={(finalValues: IRoadmap[]) => {
                    const mappedValues: IRoadmap[] = finalValues.map((item) => {
                        return {
                            ...item,
                            eaqPhaseId: eaqPhaseId,
                        };
                    });
                    return service_EAQRoadmap.createOrUpdateList(mappedValues)
                }}
            />

        </>
    );
}

const field: FieldOption<IRoadmap>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã Lộ trình",
        isRequired: true,
        isUnique: true
    },
    {
        fieldKey: "name",
        fieldName: "Tên Lộ trình",
        isRequired: true,
    },
    {
        fieldKey: "startDate",
        fieldName: "Ngày bắt đầu (dd/MM/yyyy)",
        isRequired: true,
        parseType: "date"

    },
    {
        fieldKey: "endDate",
        fieldName: "Ngày kết thúc (dd/MM/yyyy)",
        isRequired: true,
        parseType: "date"

    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
];

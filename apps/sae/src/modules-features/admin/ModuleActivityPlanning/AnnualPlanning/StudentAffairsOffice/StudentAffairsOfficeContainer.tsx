'use client'

import { service_standard } from "@/api/services/service_standard";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Stack } from "@mantine/core";
import { useState } from "react";
import StudentAffairsOfficeTable from "./StudentAffairsOfficeTable";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import StudentAffairsOfficeStandardInfo from "./StudentAffairsOfficeStandardInfo";

export default function StudentAffairsOfficeContainer() {
    const [fixedActivityPointRatio, setFixedActivityPointRatio] = useState<string>("0/0");
    const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);

    const standardQuery = useCustomReactQuery({
        queryKey: ["StudentAffairsOfficeContainer", "Standard", "GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const handleTabChange = (value: string | null) => {
        setSelectedStandardId(value);
    };

    return (
        <CustomFieldset title="Lập kế hoạch năm mới - Phòng công tác sinh viên">
            <Stack gap="xs">
                <CustomTabs
                    tabs={[
                        {
                            label: "Tất cả các điều",
                            value: "null",
                        },
                        ...(standardQuery.isSuccess && Array.isArray(standardQuery.data)
                            ? standardQuery.data
                                .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                                .map((item, index) => ({
                                    label: `Điều ${index + 1}`,
                                    value: item.id ? item.id.toString() : "",
                                    children: <div></div>,
                                }))
                            : []),
                    ]}
                    value={selectedStandardId}
                    onChange={handleTabChange}
                />

                <StudentAffairsOfficeStandardInfo
                    selectedStandardId={selectedStandardId}
                    standard={standardQuery.data || []}
                    fixedActivityPointRatio={fixedActivityPointRatio}
                />

                <StudentAffairsOfficeTable
                    standardId={selectedStandardId}
                    setFixedActivityPointRatio={setFixedActivityPointRatio}
                />
            </Stack>
        </CustomFieldset>
    );
}

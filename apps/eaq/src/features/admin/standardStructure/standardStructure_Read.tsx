"use client";

import { IconCertificate, IconFileDescription, IconListCheck } from "@tabler/icons-react";
import StandardStructure_TabCriteria from "./criteria/standardStructure_TabCriteria";
import StandardStructure_TabRequirement from "./requirement/standardStructure_TabRequirement";
import StandardStructure_TabStandard from "./standard/standardStructure_TabStandard";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function StandardStructure_Read() {
    const tabData = [
        { label: "Tiêu chuẩn" },
        { label: "Tiêu chí" },
        { label: "Yêu cầu" },
    ];

    return (
        <CustomFieldset title="Cấu trúc bộ tiêu chuẩn">
            <CustomTabs tabs={[
                {
                    label: "Tiêu chuẩn",
                    children: <StandardStructure_TabStandard />,
                    leftSection: <IconCertificate size={16} />
                },
                {
                    label: "Tiêu chí",
                    children: <StandardStructure_TabCriteria />,
                    leftSection: <IconListCheck size={16} />,
                },
                {
                    label: "Yêu cầu",
                    children: <StandardStructure_TabRequirement />,
                    leftSection: <IconFileDescription size={16} />,
                },
            ]} />
        </CustomFieldset>
    );
}

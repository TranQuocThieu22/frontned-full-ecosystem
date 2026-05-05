import { service_standard } from "@/api/services/service_standard";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Flex, Stack } from "@mantine/core";
import { useState } from "react";
import DeploymentDeployStandardInfo from "./DeploymentDeployStandardInfo";
import DeploymentDeployTable from "./DeploymentDeployTable";


export default function DeploymentDeployContainer() {
    const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);
    const Q_Standard = useCustomReactQuery({
        queryKey: ["DeploymentDeployContainer_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    const handleTabChange = (value: string | null) => {
        setSelectedStandardId(value);
    };

    return (
        <Flex
            gap="md"
            justify="center"
            direction="column"
        >
            <CustomFieldset title="Triển khai kế hoạch" >
                <Stack gap="xs">
                    <CustomTabs
                        tabs={[
                            {
                                label: "Tất cả",
                                value: "all",
                            },
                            ...(Q_Standard.isSuccess && Array.isArray(Q_Standard.data)
                                ? Q_Standard.data
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

                    <DeploymentDeployStandardInfo
                        standardId={selectedStandardId}
                        standard={Q_Standard.data || []}
                    />

                    <DeploymentDeployTable 
                        standardId={selectedStandardId} 
                    />
                </Stack>
            </CustomFieldset>
        </Flex >
    );
}

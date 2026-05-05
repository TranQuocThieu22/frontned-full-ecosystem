import { service_Department } from "@/shared/APIs/service__department";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import EvidenceUsageTab from "../../ModuleEvidenceManagement/EvidenceUsageTab/EvidenceUsageTab";
import EvidenceVersionsTab from "../../ModuleEvidenceManagement/EvidenceVersionsTab/EvidenceVersionsTab";

export default function Form04CurrentSituationDetail({ evidence }: { evidence: IEvidence }) {
    const disc = useDisclosure();

    const EvidenceVersion_GetAll = useCustomReactQuery({
        queryKey: ["EvidenceVersion_GetAll", evidence.id],
        axiosFn: () =>
            service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
                evidenceId: evidence.id,
            }),
        options: {
            enabled: disc[0],
        },
    });

    const query_Unit_GetAll = useCustomReactQuery({
        queryKey: ["query_Unit_GetAll"],
        axiosFn: () => service_Department.getAll(),
        options: {
            refetchOnWindowFocus: false,
        },
    });

    const EvidenceUsage_GetAll = useCustomReactQuery({
        queryKey: ["EvidenceUsage_GetAll", evidence.id],
        axiosFn: () =>
            service_EAQEvidence.GetEvidenceUsageHistories({
                eaqEvidenceId: evidence.id,
            }),
        options: {
            enabled: disc[0],
        },
    });

    return (
        <>
            <CustomActionIcon actionType="default" onClick={disc[1].open}>
                <IconEye />
            </CustomActionIcon>
            <Modal opened={disc[0]} onClose={disc[1].close} size="90%" title="Chi tiết minh chứng">
                <CustomFlexColumn gap={4}>
                    <Text size="md">
                        <strong>Mã minh chứng:</strong> {evidence.code}
                    </Text>
                    <Text size="md">
                        <strong>Tên minh chứng:</strong> {evidence.name}
                    </Text>
                    <CustomTabs
                        tabs={[
                            {
                                label: "Phiên bản minh chứng",
                                children: (
                                    <EvidenceVersionsTab
                                        evidenceId={evidence.id}
                                        editMode={false}
                                        versions={EvidenceVersion_GetAll.data ?? []}
                                        setVersions={() => {
                                        }}
                                        listUnit={query_Unit_GetAll.data ?? []}
                                    />
                                )
                            },
                            {
                                label: "Nơi sử dụng",
                                children: (
                                    <EvidenceUsageTab usage={EvidenceUsage_GetAll.data ?? []} />
                                )
                            }
                        ]}
                    />
                </CustomFlexColumn>
            </Modal>
        </>
    );
}

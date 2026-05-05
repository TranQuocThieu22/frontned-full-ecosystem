import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EvidenceUsageTab from "./EvidenceUsageTab";
import EvidenceVersionsTab from "./EvidenceVersionsTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

export default function ViewDetailEvidence({
  evidence,
  evidenceId,
}: {
  evidence: IEvidence;
  evidenceId: number;
}) {
  const disc = useDisclosure();

  const EvidenceVersion_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceVersion_GetAll", evidenceId],
    axiosFn: () =>
      service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
        evidenceId: evidenceId,
      }),
    options: {
      enabled: disc[0],
      refetchOnWindowFocus: false,
    },
  });

  const EvidenceUsage_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceUsage_GetAll", evidenceId],
    axiosFn: () =>
      service_EAQEvidence.GetEvidenceUsageHistories({
        eaqEvidenceId: evidenceId,
      }),
    options: {
      enabled: disc[0],
    },
  });

  return (
    <CustomButtonModal
      disclosure={disc}
      isActionIcon={true}
      actionIconProps={{
        actionType: "view",
      }}
      modalProps={{
        size: "90%",
        title: "Chi tiết minh chứng",
      }}
    >
      <Flex gap="2" direction={"column"}>
        <Text span fw={500}>
          Mã minh chứng: <Text span>{evidence.code}</Text>
        </Text>
        <Text span fw={500}>
          Tên minh chứng: <Text span>{evidence.name} </Text>
        </Text>
      </Flex>
      <CustomTabs
        tabs={[
          {
            label: "Phiên bản minh chứng",
            children: (
              <EvidenceVersionsTab
                versions={EvidenceVersion_GetAll.data ?? []}
              />
            ),
          },
          {
            label: "Nơi sử dụng",
            children: (
              <EvidenceUsageTab usage={EvidenceUsage_GetAll.data ?? []} />
            ),
          },
        ]}
      />
    </CustomButtonModal>
  );
}

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconList, IconLocation } from "@tabler/icons-react";
import EvidenceUsageTab from "./EvidenceUsageTab";
import EvidenceVersionsTab from "./EvidenceVersionsTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface IProps {
  evidenceId: number;
  evidenceCode: string;
  evidenceName: string;
}

export default function ViewDetailResultTableEvidenceDetail({ evidenceId, evidenceCode, evidenceName }: IProps) {
  const disc = useDisclosure();

  const evidenceVersionQuery = useCustomReactQuery({
    queryKey: ["evidenceVersionQuery", evidenceId],
    axiosFn: () =>
      service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
        evidenceId: evidenceId,
      }),
    options: {
      enabled: disc[0],
    },
  });

  const evidenceUsageQuery = useCustomReactQuery({
    queryKey: ["evidenceUsageQuery", evidenceId],
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
        <Text>Mã minh chứng: {evidenceCode} </Text>
        <Text>Tên minh chứng: {evidenceName} </Text>
      </Flex>
      <CustomTabs
        defaultValue={"Phiên bản minh chứng"}
        tabs={[
          {
            label: "Phiên bản minh chứng",
            children: (
              <EvidenceVersionsTab
                data={evidenceVersionQuery.data || []}
                isLoading={evidenceVersionQuery.isLoading}
                isError={evidenceVersionQuery.isError}
              />
            ),
            leftSection: <IconList />,
          },
          {
            label: "Nơi sử dụng",
            children: (
              <EvidenceUsageTab
                data={evidenceUsageQuery.data || []}
                isLoading={evidenceUsageQuery.isLoading}
                isError={evidenceUsageQuery.isError}
              />
            ),
            leftSection: <IconLocation />,
          },
        ]}
      />
    </CustomButtonModal>
  );
}

"use client";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import EvidenceTable from "./CollectEvidenceModalLayout/EvidenceTable";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

interface Props {
  onSelectEvidence?: (value: IEvidence) => void
}

export default function EvidenceCollectButtonModal({ onSelectEvidence }: Props) {
  const modalDisc = useDisclosure();

  return (
    <CustomButtonModal
      disclosure={modalDisc}
      buttonProps={{
        mb: "sm",
        leftSection: <IconSearch size={16} />,
        w: "200px",
        children: "Thu thập minh chứng",
        color: "blue"
      }}
      modalProps={{
        size: "90%"
      }}
    >
      <CustomFieldset title="Danh sách kế hoạch tự đánh giá">
        <EvidenceTable modalDisc={modalDisc} onSelectEvidence={onSelectEvidence} />
      </CustomFieldset>
    </CustomButtonModal>
  );
}

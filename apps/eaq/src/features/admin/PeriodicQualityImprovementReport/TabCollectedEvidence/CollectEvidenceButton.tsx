"use client";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import EvidenceTable from "./CollectEvidenceModalLayout/EvidenceTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface Props {
    onSelectEvidence?: (value: IEvidence) => void
}

export default function CollectEvidenceButton({ onSelectEvidence }: Props) {
    const modalDisc = useDisclosure();

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            buttonProps={{
                mb: "sm",
                leftSection: <IconSearch />,
                w: "100%",
                children: "Thu thập minh chứng",
                color: "blue",
            }}
            modalProps={{
                size: "90%"
            }}
        >
            <CustomFieldset mt="sm" title="Danh sách minh chứng">
                <EvidenceTable modalDisc={modalDisc} onSelectEvidence={onSelectEvidence} />
            </CustomFieldset>
        </CustomButtonModal>
    )
};

"use client";

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList, IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import EvidenceGeneralInfoForm from "./EvidenceGeneralInfoTab/EvidenceGeneralInfoForm";
import EvidenceVersionTable from "./EvidenceVersionTab/EvidenceVersionTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

export default function EvidenceCreateButton({
    evidences = [],
}: {
    evidences?: IEvidence[];
}) {
    const modalDisc = useDisclosure();
    const queryClient = useQueryClient();

    const [versions, setVersions] = useState<IEnvidenceVersion[]>([]);
    const [currentTab, setCurrentTab] = useState<string | null>('Thông tin chung');

    const createForm = useForm<IEvidence>({
        initialValues: {
            code: "",
            name: "",
            note: "",
            referenceEvidenceId: undefined,
        },
        validate: {
            code: (value) => (!value ? "Mã minh chứng là bắt buộc" : null),
            name: (value) => (!value ? "Tên minh chứng là bắt buộc" : null),
        },
    });

    const handleSubmit = async () => {
        if (createForm.validate().hasErrors) {
            notifications.show({
                color: "red",
                message: "Vui lòng nhập dữ liệu",
            })

            setCurrentTab("Thông tin chung");
            return;
        }

        // Check logic isCurrent
        const isCurrentCount = versions.filter((version) => version.isCurrent).length;
        if (isCurrentCount > 1) {
            setCurrentTab("Phiên bản minh chứng");

            return notifications.show({
                color: "red",
                message: "Chỉ được phép có một phiên bản hiện hành.",
            });
        } else if (isCurrentCount === 0) {
            setCurrentTab("Phiên bản minh chứng");

            return notifications.show({
                color: "red",
                message: "Vui lòng chọn 1 phiên bản hiện hành",
            });
        }

        // Create evidence
        const evidenceRes = await service_EAQEvidence.create(createForm.values);
        const success = evidenceRes.data.isSuccess === 1;
        const evidenceId = evidenceRes.data.data?.id;

        // Chuẩn bị versions
        const creatingVersions = success
            ? versions.map((v) => ({ ...v, eaqEvidenceId: evidenceId }))
            : [];

        let versionSuccess = true;
        if (success && creatingVersions.length > 0) {
            try {
                const versionRes = await service_EAQEvidenceVersion.createOrUpdateList(creatingVersions);
                versionSuccess = versionRes.data.isSuccess === 1;
            } catch {
                versionSuccess = false;
            }
        }

        // Tổng kết kết quả
        const isAllSuccess = success && versionSuccess;

        notifications.show({
            color: isAllSuccess ? "green" : "red",
            message: isAllSuccess
                ? "Tạo dữ liệu thành công"
                : "Tạo dữ liệu không thành công",
        });

        if (isAllSuccess) {
            createForm.reset();
            setVersions([]);
            modalDisc[1].close();
            await queryClient.invalidateQueries({ queryKey: ["PeriodicQualityImprovementReport_Evidences_GetAll"] });
        }
    };

    return (
        <CustomButtonModal
            buttonProps={{
                leftSection: <IconPlus />,
                children: "Thêm",
            }}
            modalProps={{ size: "80%", title: "Chi tiết minh chứng" }}
            disclosure={modalDisc}
        >
            <Stack gap="md">
                <CustomTabs
                    value={currentTab}
                    onChange={setCurrentTab}
                    tabs={[
                        {
                            label: "Thông tin chung",
                            leftSection: <IconInfoCircle />,
                            children: <EvidenceGeneralInfoForm readOnly={false} evidenceForm={createForm} evidences={evidences} />
                        },
                        {
                            label: "Phiên bản minh chứng",
                            leftSection: <IconList />,
                            children: <EvidenceVersionTable versions={versions} setVersions={setVersions} />
                        },
                    ]}
                />

                <CustomButton fullWidth type="submit" actionType="save" onClick={handleSubmit}>
                    Lưu
                </CustomButton>
            </Stack>
        </CustomButtonModal>
    );
}

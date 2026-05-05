"use client";

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList, IconLocation } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EvidenceGeneralInfoForm from "./EvidenceGeneralInfoTab/EvidenceGeneralInfoForm";
import EvidenceUsageTable from "./EvidenceUsageTab/EvidenceUsageTable";
import EvidenceVersionTable from "./EvidenceVersionTab/EvidenceVersionTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

interface Props {
    values?: IEvidence,
    readOnly?: boolean,
    evidences?: IEvidence[];
}

export default function EvidenceViewOrUpdateModal({
    values,
    readOnly,
    evidences = []
}: Props) {
    const modalDisc = useDisclosure();
    const queryClient = useQueryClient();

    const [versions, setVersions] = useState<IEnvidenceVersion[]>([]);
    const [currentTab, setCurrentTab] = useState<string | null>("Thông tin chung");

    const evidenceVersionQuery = useCustomReactQuery({
        queryKey: ["EvidenceVersion_GetAll"],
        axiosFn: () =>
            service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
                evidenceId: values?.id,
            }),
        options: {
            enabled: modalDisc[0],
        },
    });

    const evidenceForm = useForm<IEvidence>({
        mode: "uncontrolled",
        validate: {
            code: (value) => (!value ? "Mã minh chứng là bắt buộc" : null),
            name: (value) => (!value ? "Tên minh chứng là bắt buộc" : null),
        },
    });

    useEffect(() => {
        evidenceForm.setValues({
            ...values,
            isEnabled: true,
            referenceEvidenceId: values?.referenceEvidence?.id
        });
    }, [values]);

    useEffect(() => {
        setVersions(evidenceVersionQuery.data ?? []);
    }, [evidenceVersionQuery.data]);

    const handleSubmit = async () => {
        if (evidenceForm.validate().hasErrors) {
            notifications.show({
                color: "red",
                message: "Vui lọc nhập dữ liệu",
            })

            setCurrentTab("Thông tin chung");
            return false;
        }

        // Check logic isCurrent
        const isCurrentCount = versions.filter(
            (version) => version.isCurrent && version.statusAction != "isDelete"
        ).length;

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

        // Update evidence
        const updatingVersions = versions
            .filter(v => v.statusAction)
            .map(v => v.statusAction === "isDelete" ? { ...v, isEnable: false } : v);

        // Gọi API cập nhật song song (nếu có version)
        const [evidenceRes, versionRes] = await Promise.all([
            service_EAQEvidence.update(evidenceForm.getValues()),
            updatingVersions.length > 0
                ? service_EAQEvidenceVersion.createOrUpdateList(updatingVersions)
                : Promise.resolve({ data: { isSuccess: 1 } }), // giả thành công nếu không có version
        ]);

        // Kiểm tra kết quả
        const isSuccess = evidenceRes.data.isSuccess === 1 && versionRes.data.isSuccess === 1;

        notifications.show({
            color: isSuccess ? "green" : "red",
            message: isSuccess ? "Cập nhật dữ liệu thành công" : "Cập nhật dữ liệu không thành công",
        });

        if (!isSuccess) return;

        modalDisc[1].close();
        queryClient.invalidateQueries({ queryKey: ["PeriodicQualityImprovementReport_Evidences_GetAll",] });
        queryClient.invalidateQueries({ queryKey: ["EvidenceVersion_GetAll"] });
        queryClient.invalidateQueries({ queryKey: ["EvidenceUsage_GetAll"] });
    };

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            isActionIcon
            actionIconProps={{
                actionType: readOnly ? "view" : "update",
            }}
            modalProps={{
                size: "100%",
                title: "Chi tiết minh chứng",
            }}
        >
            <Stack gap="md">
                <CustomTabs
                    value={currentTab}
                    onChange={setCurrentTab}
                    tabs={[
                        {
                            label: "Thông tin chung",
                            leftSection: <IconInfoCircle />,
                            children: <EvidenceGeneralInfoForm readOnly={readOnly} isUpdateMode={!readOnly} evidenceForm={evidenceForm} evidences={evidences} />
                        },
                        {
                            label: "Phiên bản minh chứng",
                            leftSection: <IconList />,
                            children: <EvidenceVersionTable readOnly={readOnly} evidenceId={values?.id} versions={versions} setVersions={setVersions} />
                        },
                        {
                            label: "Nơi sử dụng",
                            leftSection: <IconLocation />,
                            children: <EvidenceUsageTable modalDisc={modalDisc} values={values} />
                        },
                    ]}
                />

                {!readOnly && (
                    <CustomButton mt="md" fullWidth actionType="save" onClick={handleSubmit}>
                        Lưu
                    </CustomButton>
                )}
            </Stack>
        </CustomButtonModal>
    );
}

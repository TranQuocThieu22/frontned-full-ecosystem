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
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  values?: IEvidence,
  readOnly?: boolean,
  evidences?: IEvidence[];
}

export default function EvidenceViewOrUpdateModal({
  values,
  readOnly = true,
  evidences = [],
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
    let updatingVersions = versions.filter((version) => version.statusAction).map((version) =>
      version.statusAction === "isDelete" ? { ...version, isEnable: false } : version
    );

    const evidenceRes = await service_EAQEvidence.update(evidenceForm.getValues());
    const versionRes = await service_EAQEvidenceVersion.createOrUpdateList(updatingVersions);

    if (evidenceRes.data.isSuccess === 1 && versionRes.data.isSuccess === 1) {
      notifications.show({
        color: "green",
        message: "Cập nhật dữ liệu thành công",
      });

      modalDisc[1].close();
      await queryClient.invalidateQueries({ queryKey: ["ExistingEvidence_Evidences_GetAll"] });
      await queryClient.invalidateQueries({ queryKey: ["EvidenceVersion_GetAll"] });
      await queryClient.invalidateQueries({ queryKey: ["EvidenceUsage_GetAll"] });
    } else {
      notifications.show({
        color: "red",
        message: "Cập nhật dữ liệu không thành công",
      });

      return;
    }
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
    </CustomButtonModal >
  );
}

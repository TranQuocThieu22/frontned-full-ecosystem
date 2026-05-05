"use client";

import { Stack, Tabs, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceSim, IconEdit, IconEye, IconListDetails, IconReportAnalytics } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import EvidenceUsageTab from "./EvidenceUsageTab/EvidenceUsageTab";
import EvidenceVersionsTab from "./EvidenceVersionsTab/EvidenceVersionsTab";

import { service_Department } from "@/shared/APIs/service__department";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { service_EvidenceType } from "@/shared/APIs/service_EvidenceType";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

export default function EvidenceActionViewOrUpdate({
  values,
  editMode = true,
  listEvidence = [],
}: {
  values: IEvidence;
  listEvidence?: IEvidence[];
  editMode?: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [versions, setVersions] = useState<IEnvidenceVersion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const EvidenceVersion_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceVersion_GetAll", values.id],
    axiosFn: () =>
      service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
        evidenceId: values.id,
      }),
    options: {
      enabled: opened,
      refetchOnWindowFocus: false,
    },
  });

  const query_Unit_GetAll = useCustomReactQuery({
    queryKey: ["query_Unit_GetAll"],
    axiosFn: () => service_Department.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const getEvidenceTypeQuery = useCustomReactQuery({
    queryKey: ["query_EvidenceType_GetAll"],
    axiosFn: () => service_EvidenceType.GetEvidenceTypeByDepartment(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const EvidenceUsage_GetAll = useCustomReactQuery({
    queryKey: ["EvidenceUsage_GetAll", values.id],
    axiosFn: () =>
      service_EAQEvidence.GetEvidenceUsageHistories({
        eaqEvidenceId: values.id,
      }),
    options: {
      enabled: opened,
    },
  });

  const form = useForm<IEvidence>({
    mode: "uncontrolled",
    validate: {
      code: (value) => (!value ? "Mã minh chứng là bắt buộc" : null),
      name: (value) => (!value ? "Tên minh chứng là bắt buộc" : null),
      evidenceTypeId: (value) => (!value ? "Loại minh chứng là bắt buộc" : null),
    },
  });

  // Load form values when modal opens
  useEffect(() => {
    if (opened) {
      form.setValues({
        ...values,
        evidenceTypeId: values.evidenceTypeId || (values as any).evidenceTypeId || (values as any).evidenceType?.id,
        isEnabled: true,
      });
    }
  }, [opened, values]);

  // Load versions when data is fetched
  useEffect(() => {
    if (EvidenceVersion_GetAll.data) {
      setVersions(EvidenceVersion_GetAll.data);
    }
  }, [EvidenceVersion_GetAll.data]);

  const handleSubmit = async () => {
    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    const result = form.validate();
    if (result.hasErrors) {
      notifications.show({
        color: "red",
        message: "Vui lòng kiểm tra lại các trường thông tin bắt buộc",
      });
      return;
    }

    let listVersionsChanged = versions.filter((v) => v.statusAction);

    // Check if there's at least one current version
    const activeVersions = versions.filter(
      (v) => v.statusAction !== "isDelete"
    );

    if (activeVersions.length === 0) {
      notifications.show({
        color: "red",
        message: "Vui lòng thêm ít nhất một phiên bản minh chứng.",
      });
      return;
    }

    // Check logic isCurrent
    const isCurrentCount = activeVersions.filter((v) => v.isCurrent).length;

    if (isCurrentCount > 1) {
      notifications.show({
        color: "red",
        message: "Chỉ được phép có một phiên bản hiện hành.",
      });
      return;
    } else if (isCurrentCount === 0) {
      notifications.show({
        color: "red",
        message: "Vui lòng chọn một phiên bản hiện hành. Không có phiên bản nào được đánh dấu là hiện hành.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Update evidence
      await service_EAQEvidence.update(form.getValues());

      // Update versions
      listVersionsChanged = listVersionsChanged.map((v) =>
        v.statusAction === "isDelete" ? { ...v, isEnable: false } : v
      );

      if (listVersionsChanged.length > 0) {
        await service_EAQEvidenceVersion.createOrUpdateList(listVersionsChanged);
      }

      notifications.show({
        color: "green",
        message: "Sửa thành công",
      });

      close();
      await queryClient.invalidateQueries();
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Có lỗi xảy ra khi lưu",
      });
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomButtonModal
      isActionIcon={true}
      actionIconProps={{
        actionType: editMode ? 'update' : 'view',
        color: editMode ? "yellow" : "blue",
        children: editMode ? <IconEdit /> : <IconEye />
      }}
      modalProps={{
        size: "100%",
        title: "Chi tiết minh chứng"
      }}
      disclosure={[opened, { open, close, toggle: () => { } }]}
    >
      <Stack gap="md">
        <CustomTabs
          tabs={[
            {
              label: "Thông tin chung",
              children: (
                <Stack gap="md">
                  <CustomTextInput
                    label="Mã minh chứng"
                    withAsterisk
                    {...form.getInputProps("code")}
                    key={form.key("code")}
                    readOnly
                  />

                  <CustomTextInput
                    label="Tên minh chứng"
                    {...form.getInputProps("name")}
                    key={form.key("name")}
                    withAsterisk
                    readOnly={!editMode}
                  />

                  <CustomSelect
                    withAsterisk
                    label="Loại minh chứng"
                    placeholder="Chọn loại minh chứng"
                    readOnly={!editMode}
                    data={
                      getEvidenceTypeQuery.data?.map((item) => ({
                        value: String(item.id),
                        label: item.name ?? "",
                      })) || []
                    }
                    {...form.getInputProps("evidenceTypeId")}
                    key={form.key("evidenceTypeId")}
                    value={
                      form.values.evidenceTypeId
                        ? String(form.values.evidenceTypeId)
                        : null
                    }
                    onChange={(val) =>
                      form.setFieldValue(
                        "evidenceTypeId",
                        val && val !== "" ? Number(val) : undefined
                      )
                    }
                  />

                  <CustomSelect
                    data={
                      listEvidence.map((item) => ({
                        value: String(item.id ?? ""),
                        label: String(item.code ?? ""),
                      })) ?? []
                    }
                    label="Trực thuộc minh chứng"
                    placeholder="Nhập mã minh chứng cha"
                    readOnly={!editMode}
                    {...form.getInputProps("referenceEvidenceId")}
                    key={form.key("referenceEvidenceId")}
                    value={
                      form.values.referenceEvidenceId
                        ? String(form.values.referenceEvidenceId)
                        : null
                    }
                    onChange={(val) =>
                      form.setFieldValue(
                        "referenceEvidenceId",
                        val !== "" ? Number(val) : undefined
                      )
                    }
                  />

                  <Textarea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    rows={4}
                    {...form.getInputProps("note")}
                    key={form.key("note")}
                    readOnly={!editMode}
                  />
                </Stack>
              ),
              leftSection: <IconReportAnalytics size={16} />,
            },
            {
              label: "Phiên bản minh chứng",
              children: (
                <EvidenceVersionsTab
                  evidenceId={values.id}
                  editMode={editMode}
                  versions={versions}
                  setVersions={setVersions}
                  listUnit={query_Unit_GetAll.data ?? []}
                />
              ),
              leftSection: <IconListDetails size={16} />,
            },
            {
              label: "Nơi sử dụng",
              children: <EvidenceUsageTab usage={EvidenceUsage_GetAll.data ?? []} />,
              leftSection: <IconDeviceSim size={16} />,
            },
          ]}
        />

        {editMode && (
          <CustomButton
            fullWidth
            actionType="save"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Lưu
          </CustomButton>
        )}
      </Stack>
    </CustomButtonModal>
  );
}

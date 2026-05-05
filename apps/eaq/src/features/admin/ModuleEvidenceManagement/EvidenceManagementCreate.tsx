"use client";

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_Department } from "@/shared/APIs/service__department";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconListDetails, IconPlus, IconReportAnalytics } from "@tabler/icons-react";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import EvidenceVersionsTab from "./EvidenceVersionsTab/EvidenceVersionsTab";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

interface IEvidenceFormValues extends IEvidence {
  versions: IEnvidenceVersion[];
}

interface EvidenceManagementCreateProps {
  listEvidence?: IEvidence[];
}

export default function EvidenceManagementCreate({
  listEvidence = [],
}: EvidenceManagementCreateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  // Form with embedded versions
  const form = useForm<IEvidenceFormValues>({
    initialValues: {
      code: "",
      name: "",
      note: "",
      referenceEvidenceId: undefined,
      versions: [],
    },
    validate: {
      code: (value) => {
        if (!value?.trim()) return "Mã minh chứng là bắt buộc";
        if (value.length > 50) return "Mã minh chứng không được quá 50 ký tự";
        return null;
      },
      name: (value) => {
        if (!value?.trim()) return "Tên minh chứng là bắt buộc";
        if (value.length > 255) return "Tên minh chứng không được quá 255 ký tự";
        return null;
      },
      versions: (value) => {
        if (!value || value.length === 0) {
          return "Phải có ít nhất một phiên bản";
        }
        const currentVersions = value.filter((v) => v.isCurrent);
        if (currentVersions.length === 0) {
          return "Vui lòng chọn một phiên bản hiện hành";
        }
        if (currentVersions.length > 1) {
          return "Chỉ được phép có một phiên bản hiện hành";
        }
        return null;
      },
    },
  });

  // Fetch departments
  const getAllDepartmentQuery = useCustomReactQuery({
    queryKey: ["query_Unit_GetAll"],
    axiosFn: () => service_Department.getAll(),
  });

  // Generate code when modal opens
  const generateCodeQuery = useCustomReactQuery({
    axiosFn: () =>
      codeFormulaService.GenerateCodeByCodeFormula({
        operationType: ENUM_BUSINESS_TYPE["Danh sách minh chứng"],
      }),
    queryKey: ["GenerateEvidenceManagementCode", opened],
    options: {
      enabled: opened,
      staleTime: 0,
      retry: 2,
    },
  });

  // Set generated code when available
  useEffect(() => {
    if (generateCodeQuery.data && opened) {
      if (!form.values.code) {
        form.setFieldValue("code", generateCodeQuery.data);
      }
    }
  }, [generateCodeQuery.data, opened]);

  // Reset form when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset();
    }
  }, [opened]);

  // Handle version updates from child component
  const handleVersionsChange = useCallback(
    (updatedVersions: IEnvidenceVersion[]) => {
      form.setFieldValue("versions", updatedVersions);
    },
    [form]
  );

  // Validate and create evidence with versions
  const handleSubmit = async () => {
    // Prevent double submission
    if (isSubmitting) return;

    // Validate form
    const validationErrors = form.validate();
    if (validationErrors.hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const values = form.getValues();

      // Sanitize input
      const sanitizedEvidence: IEvidence = {
        code: values?.code?.trim(),
        name: values?.name?.trim(),
        note: values.note?.trim() || "",
        referenceEvidenceId: values.referenceEvidenceId,
      };

      // Create evidence
      const evidenceResponse = await service_EAQEvidence.create(sanitizedEvidence);

      if (evidenceResponse.data.isSuccess !== 1) {
        throw new Error(
          evidenceResponse.data.message || "Tạo minh chứng thất bại"
        );
      }

      const createdEvidenceId = evidenceResponse.data.data.id;

      if (!createdEvidenceId) {
        throw new Error("Không nhận được ID minh chứng sau khi tạo");
      }

      // Create versions with evidence ID
      const versionsToCreate: IEnvidenceVersion[] = values.versions.map((v) => ({
        ...v,
        eaqEvidenceId: createdEvidenceId,
      }));

      const versionsResponse = await service_EAQEvidenceVersion.createOrUpdateList(
        versionsToCreate
      );

      if (versionsResponse?.data?.isSuccess === 0) {
        throw new Error("Tạo phiên bản minh chứng thất bại");
      }

      // Success notification
      notifications.show({
        color: "green",
        message: "Tạo minh chứng thành công",
        title: "Thành công",
      });

      // Reset form and close modal
      form.reset();
      close();

      // Invalidate queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["EvidenceManagementTable_GetAllEvidences"] }),
        queryClient.invalidateQueries({ queryKey: ["query_Evidence_GetAll"] }),
        queryClient.invalidateQueries({ queryKey: ["query_EvidenceVersions"] }),
      ]);
    } catch (error) {
      console.error("Error creating evidence:", error);

      notifications.show({
        color: "red",
        message:
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi tạo minh chứng",
        title: "Lỗi",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare parent evidence options
  const parentEvidenceOptions = listEvidence.map((item) => ({
    value: String(item.id ?? ""),
    label: `${item.code} - ${item.name}`,
  }));

  return (
    <CustomButtonModal
      buttonProps={{
        actionType: "create",
        leftSection: <IconPlus />,
        children: "Thêm",
        disabled: isSubmitting,
      }}
      modalProps={{
        size: "80%",
        title: "Chi tiết minh chứng",
        closeOnClickOutside: !isSubmitting,
        closeOnEscape: !isSubmitting,
      }}
      disclosure={[opened, { open, close, toggle: () => { } }]}
    >
      <Stack gap="md">
        <CustomTabs
          defaultValue="Thông tin chung"
          tabs={[
            {
              label: "Thông tin chung",
              children: (
                <Stack gap="md">
                  <CustomTextInput
                    label="Mã minh chứng"
                    withAsterisk
                    disabled={generateCodeQuery.isLoading || isSubmitting}
                    placeholder={
                      generateCodeQuery.isLoading
                        ? "Đang tạo mã..."
                        : "Nhập mã minh chứng"
                    }
                    {...form.getInputProps("code")}
                  />

                  <CustomTextInput
                    withAsterisk
                    label="Tên minh chứng"
                    placeholder="Nhập tên minh chứng"
                    disabled={isSubmitting}
                    {...form.getInputProps("name")}
                  />

                  <CustomSelect
                    data={parentEvidenceOptions}
                    label="Trực thuộc minh chứng"
                    placeholder="Chọn minh chứng cha (nếu có)"
                    clearable
                    searchable
                    disabled={isSubmitting}
                    {...form.getInputProps("referenceEvidenceId")}
                    onChange={(val) =>
                      form.setFieldValue(
                        "referenceEvidenceId",
                        val && val !== "" ? Number(val) : undefined
                      )
                    }
                  />

                  <Textarea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    rows={4}
                    disabled={isSubmitting}
                    {...form.getInputProps("note")}
                  />
                </Stack>
              ),
              leftSection: <IconReportAnalytics size={16} />,
            },
            {
              label: "Phiên bản minh chứng",
              children: (
                <>
                  <EvidenceVersionsTab
                    versions={form.values.versions}
                    setVersions={handleVersionsChange}
                    listUnit={getAllDepartmentQuery.data || []}
                  />
                  {form.errors.versions && (
                    <div style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                      {form.errors.versions}
                    </div>
                  )}
                </>
              ),
              leftSection: <IconListDetails size={16} />,
            },
          ]}
        />

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
          {isSubmitting ? "Đang lưu..." : "Lưu"}
        </CustomButton>
      </Stack>
    </CustomButtonModal>
  );
}

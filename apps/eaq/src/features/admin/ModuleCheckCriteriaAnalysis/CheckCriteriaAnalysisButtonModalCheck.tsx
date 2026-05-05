"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { enum_verificationStatus, enumLabel_verificationStatus, } from "./CheckCriteriaAnalysisRead";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";

export default function CheckCriteriaAnalysisButtonModalCheck({
  values,
}: {
  values: ITaskDetail;
}) {
  const disc = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<formValuesType<ITaskDetail>>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    if (values) form.setValues(values);
  }, [values]);

  const client = useQueryClient();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await service_EAQEvaluationPlan.reviewEAQTaskDetail({
        id: form.getValues().id,
        analysisTrackingStatus: form.getValues().analysisTrackingStatus,
        analysisReview: form.getValues().analysisReview,
        isSendMail: form.getValues().isSendMail,
        isEnabled: true,
        concurrencyStamp: form.getValues().concurrencyStamp,
      });

      disc[1].close();
      form.reset();
      await client.invalidateQueries();

      notifications.show({
        message: "Cập nhật thành công",
        color: "green",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      notifications.show({
        message: "Có lỗi xảy ra khi cập nhật",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <CustomButtonModal
      modalProps={{
        size: "lg",
        title: "Chi tiết kết quả kiểm tra",
      }}
      buttonProps={{
        actionType: 'update',
        size: "xs",
        color: "green",
        children: "Kiểm tra",
        variant: "outline",
      }}
      disclosure={disc}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <CustomSelect
            data={converterUtils.mapEnumToSelectData(
              enum_verificationStatus,
              enumLabel_verificationStatus
            )}
            label="Trạng thái kiểm tra"
            value={form.values.analysisTrackingStatus?.toString()}
            onChange={(value) => {
              form.setFieldValue("analysisTrackingStatus", Number(value));
            }}
            disabled={isSubmitting}
          />
          <CustomTextArea
            label="Nhận xét"
            {...form.getInputProps("analysisReview")}
            disabled={isSubmitting}
          />
          <CustomCheckbox
            label="Gửi thông báo"
            {...form.getInputProps("isSendMail", { type: "checkbox" })}
            disabled={isSubmitting}
          />
          <CustomButton
            loading={isSubmitting}
            type="submit"
            actionType="save"
            fullWidth
          >
            Lưu
          </CustomButton>
        </Stack>
      </form>
    </CustomButtonModal>
  );
}

import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import { TrackingStatusEnumLabel, TrackingStatusEnum } from "@/shared/constants/enum/TrackingStatusEnum";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ReportStatusEnum } from "@/shared/constants/enum/ReportStatusEnum";

interface ITrackingSubmitRequirementReportForm {
  eaqRequirementId?: number;
  trackingStatus?: number;
  review?: string;
  isSendMail?: boolean;
  userId?: number;
}

export default function TrackingJustificationCheckButton({
  value,
}: {
  value: IRequirement;
}) {
  const dis = useDisclosure();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const form = useForm<ITrackingSubmitRequirementReportForm>({
    initialValues: {
      eaqRequirementId: value?.id,
      trackingStatus: value?.trackingStatus || 0,
      review: "",
      isSendMail: false,
      userId: value?.userId || undefined,
    },
    validate: {
      trackingStatus: (value) =>
        value === 0 || value === undefined ? "Trạng thái không được để trống" : null,
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return await service_EAQRequirement.TrackingSubmitRequirementReport({
        eaqRequirementId: form.getValues().eaqRequirementId,
        trackingStatus: form.getValues().trackingStatus,
        review: form.getValues().review,
        isSendMail: form.getValues().isSendMail,
        userId: form.getValues().userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirementQuery"] });
      notifications.show({
        color: "green",
        message: "Gửi thông báo thành công",
      });
      setLoading(false);
      dis[1].close();
    },
    onError: () => {
      notifications.show({
        color: "red",
        message: "Gửi thông báo thất bại!",
      });
      setLoading(false);
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;
    setLoading(true);
    if (form.getValues().isSendMail == true && !form.getValues().userId) {
      notifications.show({
        color: "red",
        title: "Gửi thông báo thất bại!",
        message: "Thiếu thông tin nhân sự phụ trách",
      });
      setLoading(false);
      return false;
    }
    mutation.mutateAsync();
  };
  const IsSubmitted = (reportStatus: number | undefined) => reportStatus === ReportStatusEnum.submitted

  return (
    <CustomButtonModal
      disclosure={dis}
      isActionIcon={true}
      actionIconProps={{
        actionType: "validate",
        toolTipProps: {
          label: IsSubmitted(value.reportStatus) ? "Kiểm tra" : "Chưa thể kiểm tra"
        },
        disabled: !IsSubmitted(value.reportStatus)

      }}
      modalProps={{
        size: "lg",
        title: "Chi tiết kết quả kiểm tra",
      }}
    >
      <CustomSelect
        label="Trạng thái kiểm tra"
        error={form.errors.trackingStatus}
        data={converterUtils.mapEnumToSelectData(TrackingStatusEnum, TrackingStatusEnumLabel)}
        value={form.values?.trackingStatus?.toString() || undefined}
        onChange={(value: any) => form.setFieldValue("trackingStatus", parseInt(value))}
      />
      <CustomTextArea label="Nhận xét chung" {...form.getInputProps("review")} />
      <CustomCheckbox
        label="Gửi thông báo"
        {...form.getInputProps("isSendMail", { type: "checkbox" })}
      />

      <CustomButton
        loading={loading}
        type="submit"
        actionType="save"
        onClick={() => {
          handleSubmit();
        }}
        fullWidth
      >
        Lưu
      </CustomButton>
    </CustomButtonModal>
  );
}

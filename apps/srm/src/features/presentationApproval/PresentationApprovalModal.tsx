import { topicService } from "@/shared/APIs/topicService";
import { EnumLabelProposalReviewStatus, EnumProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { ITopicReviewPreliminary, SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function PresentationApprovalModal(
  { data, loading }: { data: SRMTopic, loading?: boolean }
) {
  const queryClient = useQueryClient();
  const disclosure = useDisclosure();
  const form = useForm<ITopicReviewPreliminary>({
    mode: "uncontrolled",
    initialValues: {
      id: data?.id ?? 0,
      status: data?.proposalStatus,
      review: data?.proposalReview,
      isSentMail: data?.proposalIsSentMail,
      type: 2
    }
  });

  const handleSubmit = () => {
    const validationResult = form.validate();
    if (validationResult.hasErrors) {
      return false;
    }
    topicService.ReviewSRMTopic(form.getValues()).then((res) => {
      if (res.data.isSuccess === 1) {
        utils_notification_show({ crudType: "update", message: "Cập nhật thành công!" });
        queryClient.invalidateQueries({ queryKey: ["PresentationApprovalQuery_GetAll"] });
        form.reset();
        form.clearErrors();
        disclosure[1].close();
        return true;
      }
      utils_notification_show({ crudType: "error", message: "Có lỗi xảy ra, vui lòng thử lại!" });
    });
  }

  useEffect(() => {
    if (data) {
      form.setValues({
        id: data?.id ?? 0,
        status: data?.proposalStatus,
        review: data?.proposalReview,
        isSentMail: data?.proposalIsSentMail
      });
    }

    if (!disclosure[0]) {
      form.reset();
      form.clearErrors();
    }
  }, [data, disclosure[0]]);
  return (
    <CustomButtonModal
      modalProps={{
        title: "Chi tiết duyệt thuyết minh",
        size: "35%"
      }}
      isActionIcon
      actionIconProps={{
        actionType: "validate",
        loading: loading,
        toolTipProps: { label: "Duyệt" },
      }}
      disclosure={disclosure}>
      <Stack>
        <CustomSelect
          label="Trạng thái duyệt"
          {...form.getInputProps("review")}
          data={converterUtils.mapEnumToSelectData(EnumProposalReviewStatus, EnumLabelProposalReviewStatus)}
          defaultValue={data.proposalStatus?.toString()}
          onChange={(value) => {
            const id = value !== null ? Number(value) : undefined;
            form.setFieldValue("status", id);
          }}
          error={form.errors.status}
        />
        <CustomTextArea
          label="Nhận xét"
          {...form.getInputProps("review")}
          defaultValue={data.proposalReview?.toString() ?? ""}
        />
        <CustomCheckbox
          label="Gửi thông báo"
          {...form.getInputProps("isSentMail")}
          defaultChecked={data.proposalIsSentMail ?? false} />
        <CustomButton actionType='save' onClick={handleSubmit} />
      </Stack>
    </CustomButtonModal>
  )
}

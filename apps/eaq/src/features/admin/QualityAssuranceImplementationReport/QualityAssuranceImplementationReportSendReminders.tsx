import { useDisclosure } from "@mantine/hooks";
import { IconMail } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { ISendEAQReportReminder, service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export default function QualityAssuranceImplementationReportSendReminders({
  values,
}: {
  values: ISendEAQReportReminder;
}) {
  const disclosure = useDisclosure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ISendEAQReportReminder) => service_EAQAnalysis.sendEAQReportReminder(data),
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Gửi nhắc nhở thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["ReportReminder", values.eaqReportId] });
      queryClient.invalidateQueries({ queryKey: ["TaskQueryDetailReport", values.eaqPhaseId] });
      disclosure[1].close();
      form.reset();
    },
    onError: () => {
      notifications.show({
        color: "red",
        message: "Đã có lỗi xảy ra khi gửi nhắc nhở",
      });
    },
  });

  const form = useForm<ISendEAQReportReminder>({
    initialValues: {
      ...values,
    },
    validate: {
      description: (value) => (!value?.trim() ? "Vui lòng nhập nội dung thông báo" : null),
    },
  });

  return (
    <CustomButtonModal
      modalProps={{
        size: "md",
        title: "Gửi nhắc nhở",
      }}
      actionIconProps={{
        children: <IconMail stroke={2} />,
        color: "indigo",
        toolTipProps: { label: "Gửi nhắc nhở" },
      }}
      disclosure={disclosure}
      isActionIcon
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutation.mutate(values);
        })}
      >
        <Stack>
          <CustomTextArea
            label="Nội dung thông báo"
            placeholder="Nhập nội dung thông báo..."
            withAsterisk
            minRows={4}
            {...form.getInputProps("description")}
          />
          <CustomButton type="submit" actionType="save" fullWidth loading={mutation.isPending}>
            Gửi
          </CustomButton>
        </Stack>
      </form>
    </CustomButtonModal>
  );
}

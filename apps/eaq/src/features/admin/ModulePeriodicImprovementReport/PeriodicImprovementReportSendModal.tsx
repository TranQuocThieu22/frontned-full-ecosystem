import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { ISendEAQReportReminder, service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IReminder } from "@/shared/interfaces/reminder/IReminder";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

interface Props {
  eaqReportId?: number
  userId?: number
  userFullName?: string
}

export default function PeriodicImprovementReportSendModal({ eaqReportId, userId, userFullName }: Props) {
  const disc = useDisclosure(false);
  const queryClient = useQueryClient()
  const filterStore = useS_Shared_Filter()
  const handleSubmit = () => {
    const payload: ISendEAQReportReminder = {
      eaqReportId: eaqReportId,
      userId: userId,
      description: form.values.description
    }

    // Show loading notification
    notifications.show({
      id: 'send-reminder',
      loading: true,
      title: 'Đang xử lý',
      message: 'Đang gửi thông báo...',
      autoClose: false,
      withCloseButton: false,
    });
    disc[1].close();

    service_EAQAnalysis.sendEAQReportReminder(payload)
      .then(res => {
        // Update to success notification
        notifications.update({
          id: 'send-reminder',
          color: 'green',
          title: 'Gửi thông báo thành công',
          message: `Đã gửi thông báo cho ${userFullName}`,
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['taskDetailQuery_PeriodicImprovementReportTable', filterStore.state.Phase?.id] })
      })
      .catch(res => {
        // Update to error notification
        notifications.update({
          id: 'send-reminder',
          color: 'red',
          title: 'Đã có lỗi xảy ra',
          message: 'Vui lòng kiểm tra lại',
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
        });
      });
  }
  const form = useForm<IReminder>({
    initialValues: {},
    validate: {
      description: (value) => value ? null : "Không được để trống",
    }
  });
  return (
    <CustomButtonModal
      disclosure={disc}
      buttonProps={{ actionType: "sendMail", children: "Gửi thông báo" }}
      modalProps={{ title: "Chi tiết thông báo", size: "40%" }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <CustomTextArea
          withAsterisk
          label="Nội dung thông báo"
          {...form.getInputProps("description")}
          minRows={6}
        />
        <CustomButton mt={10} w={"100%"} actionType="save" type="submit"  >Lưu</CustomButton>
      </form>
    </CustomButtonModal>
  );
}

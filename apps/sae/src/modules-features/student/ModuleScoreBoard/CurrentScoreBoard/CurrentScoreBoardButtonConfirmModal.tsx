import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertCircleFilled, IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";



export default function CurrentScoreBoardButtonConfirmModal({ points }: { points: Record<string, number | null> }) {
  const disc = useDisclosure();
  const confirmMutation = useMutation(
    {
      // mutationFn: async (data: Record<string, number>) => {
      //   const response = await baseAxios.post("/Ranking/StudentResult", {
      //     points: data
      //   });
      //   return response.data;
      // },
      mutationFn: async (body: any) => {
        const response = await axiosInstance.post("/Ranking/StudentResult", body);
        return response.data;
      },
      onSuccess: () => {
        notifications.show({
          title: 'Cập nhật thành công',
          message: 'Dữ liệu đã được lưu thành công',
          color: 'green'
        })
        disc[1].close();
      },
      onError: (error) => {
        notifications.show({
          title: 'Cập nhật thất bại',
          message: 'Dữ liệu chưa được lưu thành công',
          color: 'red'
        })
      }
    }
  );

  const handleConfirm = () => {
    // confirmMutation.mutate(points);
    confirmMutation.mutate({});
  }

  return (
    <CustomButtonModal
      buttonProps={{
        leftSection: <IconCheck size={14} />,
        children: "Xác nhận điểm",
        color: "blue"
      }}
      modalProps={{
        title: "Thông báo"
      }}
      disclosure={disc}
    >
      <CustomFlexRow gap="3" >
        <IconAlertCircleFilled color="orange" size="20px" />
        <Text>
          Vui lòng kiểm tra dữ liệu trước khi lưu
        </Text>
      </CustomFlexRow>
      <Flex justify="flex-end" gap="sm">
        <CustomButton color="green" leftSection={<IconCheck />} onClick={handleConfirm} >Đồng ý</CustomButton>
        <CustomButton leftSection={<IconX />} onClick={disc[1].close}>Đóng</CustomButton>
      </Flex>
    </CustomButtonModal>
  );
}

import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { Button, Center, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

export default function DongBoModal({ selectedRows }) {
    const disclosure = useDisclosure(false); // 👈 đúng kiểu MyButtonModal cần
  
    const handleSync = async () => {
      if (selectedRows === 0) {
        showNotification({
          title: "Thông báo",
          message: "Bạn chưa chọn dòng nào!",
          color: "red",
        });
      } else {
        disclosure[1].open(); // 👈 mở modal đúng cách
      }
    };
  
    return (
        <MyButtonModal
          crudType="default"
          title="Thông báo"
          disclosure={disclosure}
          modalSize="sm"
          fullScreen={false}
          onClick={handleSync}
          color='green'
          label='Đồng bộ'
        >
          <Text ta="center">
            Đã đồng bộ thành công{" "}
            <Text span c="blue" td="underline">
              {selectedRows}
            </Text>{" "}
            dữ liệu danh sách nhóm thi.
          </Text>
  
          <Center mt="md">
            <Button onClick={disclosure[1].close} color="green">
              Đồng ý
            </Button>
          </Center>
        </MyButtonModal>
    );
  }
  
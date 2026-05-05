'use client';

import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Button, Flex, Group, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function MonitorAction1({ disc }: any) {
    const discConfirm = useDisclosure(false)

    return (
        <>
            <>
                <Flex
                    // w="100%" h="80vh"
                    direction="column"
                    gap="md"
                >
                    <Group w={"100%"}
                        align="start"
                        justify="space-between"
                    >
                        <Group gap={5} w={"100%"}><Text fw={600}>Thí sinh: </Text>SV00025 - Nguyễn Văn A</Group>
                        <Group gap={5} w={"100%"}><Text fw={600}>Môn thi: </Text>CSDLCB - Cơ sở dữ liệu cơ bản - room 1</Group>
                        {/* <Select
                            label="Loại vi phạm"
                            placeholder="chọn loại vi phạm"
                            data={[
                                { value: '1', label: 'Sử dụng tài liệu' },
                                { value: '2', label: 'Trao đổi' },
                                { value: '3', label: 'Khác' },
                            ]}
                            defaultValue={"1"}
                            clearable
                            mb="md"
                            w={{ base: "100%" }}
                        /> */}
                        <Textarea
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                        // minRows={4}
                        />
                        <Button
                            w={"100%"}
                            color="blue"
                            onClick={discConfirm[1].open}>
                            Lưu
                        </Button>
                    </Group>
                </Flex>
            </>
            <Modal
                size={"md"}
                opened={discConfirm[0]}
                onClose={discConfirm[1].close}
                title="Thông báo">
                <Text>
                    Bạn có chắc chắn muốn đình chỉ thí sinh này? Bài làm
                    của thí sinh sẽ bị dừng lại
                    và kết quả sẽ được tính tại thời điểm này.
                </Text>
                <Group grow m={5}>
                    <Button
                        bg={"red"}
                        onClick={() => {
                            utils_notification_show({ crudType: "delete", message: "Sinh viên đã bị đình chỉ!" })
                            discConfirm[1].close()
                            disc[1].close()
                        }}
                    >Đồng ý</Button>
                    <Button
                        bg={"gray"}
                        onClick={discConfirm[1].close}
                    >Hủy</Button>
                </Group>
            </Modal>
        </>

    )
}
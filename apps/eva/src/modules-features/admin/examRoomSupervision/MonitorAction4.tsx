'use client';

import { Button, Flex, Group, Select, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyNumberInput } from "aq-fe-framework/components";

export default function MonitorAction1({ disc }: any) {
    const discConfirm = useDisclosure(false)

    return (
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
                    <Select
                        label="Nguyên nhân"
                        placeholder="chọn nguyên nhân"
                        data={[
                            { value: '1', label: 'Lỗi máy tính' },
                            { value: '2', label: 'Lỗi tín hiệu' },
                            { value: '3', label: 'Khác' },
                        ]}
                        defaultValue={"1"}
                        clearable={false}
                        mb="md"
                        w={{ base: "100%" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        minRows={4}
                    />
                    <MyNumberInput
                        label="Số phút bù thêm"
                        hideControls
                    ></MyNumberInput>
                    <Button
                        w={"100%"}
                        color="blue" onClick={() => disc[1].close()}>
                        Lưu
                    </Button>
                </Group>
            </Flex>
        </>
    )
}
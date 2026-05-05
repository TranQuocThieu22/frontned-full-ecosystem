'use client';

import { Button, Flex, Group, NumberInput, Select, Text, Textarea } from "@mantine/core";
export default function MonitorAction2({ disc }: any) {
    return (
        <>
            <Flex
                direction="column"
            >
                <Group
                    w={"100%"}
                    align="start"
                    justify="space-between"
                >
                    <Group gap={5} w={"100%"}><Text fw={600}>Thí sinh: </Text>SV00025 - Nguyễn Văn A</Group>
                    <Group gap={5} w={"100%"}><Text fw={600}>Môn thi: </Text>CSDLCB - Cơ sở dữ liệu cơ bản - room 1</Group>
                    <Select
                        label="Loại vi phạm"
                        placeholder="chọn loại vi phạm"
                        data={[
                            { value: '1', label: 'Sử dụng tài liệu' },
                            { value: '2', label: 'Trao đổi' },
                            { value: '3', label: 'Khác' },
                        ]}
                        defaultValue={"1"}
                        clearable
                        w={{ base: "100%" }}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="nhập mô tả"
                        minRows={4}
                    />
                    <NumberInput
                        label="Điểm trừ"
                        placeholder="Nhập điểm trừ"
                    />
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
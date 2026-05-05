'use client';

import { MyFlexColumn, MyButtonModal, MyTextArea, MyButton, MyFileInput } from "aq-fe-framework/components";
import { Checkbox, Group, Box, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function F_2f0q7vzvsg_NotificationModal() {
    const disclosure = useDisclosure(false); // Use the full object

    return (
        <MyButtonModal
            label="Gửi thông báo"
            title="Chi tiết thông báo"
            disclosure={disclosure} // Pass the full object
            crudType="default"
            modalSize="60%" // Set modal size to 90%
        >
            <MyFlexColumn>
                {/* Loại thông báo */}
                <TextInput
                    label="Loại thông báo"
                    value="Thông báo sự kiện"
                    readOnly
                />

                {/* Nội dung thông báo */}
                <MyTextArea
                    label="Nội dung thông báo"
                    placeholder="Nhập nội dung thông báo..."
                />

                {/* Bottom Section */}
                <Group>
                    {/* File đính kèm */}
                    <Box>
                        <MyFileInput label="File đính kèm" />
                    </Box>

                    {/* Phương tiện and Send Button */}
                    <Group ml="auto">
                        <Box>
                            <label>Phương tiện</label>
                            <MyFlexColumn>
                                <Checkbox label="Email" />
                                <Checkbox label="Zalo" />
                                <Checkbox label="SMS" />
                            </MyFlexColumn>
                        </Box>
                        <MyButton color="green" crudType="default">Gửi</MyButton>
                    </Group>
                </Group>
            </MyFlexColumn>
        </MyButtonModal>
    );
}
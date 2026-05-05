import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Box, Center, Divider, Tabs } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import F_testRoom_CountDown from "./F_testRoom_CountDown";
import F_testRoom_ListChoiceBox from "./F_testRoom_ListChoiceBox";
import F_testRoom_SubmitTest from "./F_testRoom_SubmitTest";

export default function F_testRoom_RightToolBarLayout() {
    return (
        <Box p={'md'}>
            <F_testRoom_CountDown />
            <Divider />

            <Tabs defaultValue="gallery">
                <Tabs.List>
                    <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
                        Danh sách lựa chọn
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="gallery">
                    <CustomFlexColumn>
                        <Center mt={'md'}>
                            <CustomFlexColumn w={'80%'}>
                                <F_testRoom_ListChoiceBox listBox={[
                                    { value: "1", isDone: true },
                                    { value: "2", isDone: true },
                                    { value: "3", isDone: true },
                                    { value: "4", isDone: true, isFocus: true },
                                    { value: "5" },
                                    { value: "6" },
                                    { value: "7" },
                                    { value: "8" },
                                    { value: "9" },
                                    { value: "10" },
                                    { value: "11" },
                                    { value: "12" },
                                    { value: "13" },
                                    { value: "14" },
                                    { value: "15" },
                                    { value: "16" },
                                    { value: "17" },
                                    { value: "18" },
                                    { value: "19" },
                                    { value: "20" },
                                ]} />
                                <F_testRoom_SubmitTest />
                            </CustomFlexColumn>
                        </Center>
                    </CustomFlexColumn>
                </Tabs.Panel>

            </Tabs>
        </Box>
    )
}

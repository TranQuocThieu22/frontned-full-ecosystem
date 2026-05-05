"use client"
import F_TestRoom_Complete from "@/modules-features/main/testRoom/body/F_TestRoom_Complete";
import F_testRoom_QuestionArea from "@/modules-features/main/testRoom/body/F_testRoom_QuestionArea";
import F_TestRoom_SingleQuestion from "@/modules-features/main/testRoom/body/F_TestRoom_SingleQuestion";
import F_testRoom_GeneralInfo from "@/modules-features/main/testRoom/header/F_testRoom_GeneralInfo";
import F_testRoom_RightToolBarLayout from "@/modules-features/main/testRoom/rightToolBar/F_testRoom_RightToolBarLayout";
import useS_TestRoom from "@/modules-features/main/testRoom/useS_TestRoom";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Box, Grid, Paper, ScrollArea, Space } from "@mantine/core";
export default function Page() {
    const store = useS_TestRoom()
    return (
        <Paper p={'md'} h={'100vh'} bg={colorsObject.mantineBackgroundSecondary}>
            <Grid>
                <Grid.Col span={9}>
                    <Box h="95vh" style={{ display: "flex", flexDirection: "column" }}>
                        {/* Phần header tự động cao theo nội dung */}
                        <Paper p="md">
                            <F_testRoom_GeneralInfo />
                        </Paper>
                        <Space my={2} />
                        {/* Phần nội dung còn lại, tự chiếm hết phần trống */}
                        <Paper p="md" style={{ flex: 1, minHeight: 0 }}>
                            <ScrollArea.Autosize h="100%">
                                {store.state.status === "single" && <F_TestRoom_SingleQuestion />}
                                {store.state.status === "multiple" && <F_testRoom_QuestionArea />}
                                {store.state.status === "complete" && <F_TestRoom_Complete />}
                            </ScrollArea.Autosize>
                        </Paper>
                    </Box>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper h={'95vh'}>
                        <F_testRoom_RightToolBarLayout />
                    </Paper>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}

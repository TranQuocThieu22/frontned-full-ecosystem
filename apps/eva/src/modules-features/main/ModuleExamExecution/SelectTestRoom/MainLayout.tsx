'use client';
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Box, Button, Divider, Grid, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function MainLayout() {
    const router = useRouter()

    return (
        <>
            <Box bg={colorsObject.mantineBackgroundSecondary}>
                <Grid>
                    <Grid.Col span={12} pt={20} pb={20} px={32}>

                        <Paper p={20} shadow="sm" withBorder>
                            <Title>Danh sách ca thi của bạn</Title>

                            <Stack
                                align="stretch"
                                justify="center"
                                gap="md"
                            >
                                <Divider my="xs" label="Đang diễn ra" labelPosition="center" />
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
                                    <Paper p={20} shadow="sm" withBorder>
                                        <Stack>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Môn thi:</Text>CSDLCB - Cơ sở dữ liệu cơ bản
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Nhóm:</Text>room1
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Ngày thi:</Text>25/05/2025
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Giờ thi:</Text>09:00
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Thời gian làm bài:</Text>90 phút
                                            </Group>
                                        </Stack>
                                        <Button
                                            mt={20}
                                            onClick={() => router.replace("testRoom/2")}
                                            fullWidth
                                        >
                                            Vào thi
                                        </Button>
                                    </Paper>
                                </SimpleGrid>

                                <Divider my="xs" label="Sắp diễn ra" labelPosition="center" />
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
                                    <Paper p={20} shadow="sm" withBorder>
                                        <Stack>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Môn thi:</Text>TCC - Toán cao cấp
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Nhóm:</Text>room2
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Ngày thi:</Text>25/05/2025
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Giờ thi:</Text>09:00
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Thời gian làm bài:</Text>90 phút
                                            </Group>
                                        </Stack>
                                        <Button
                                            disabled
                                            mt={20}
                                            onClick={() => router.replace("testRoom/2")}
                                            fullWidth
                                        >
                                            Vào thi
                                        </Button>
                                    </Paper>
                                </SimpleGrid>

                                <Divider my="xs" label="Đã kết thúc" labelPosition="center" />
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
                                    <Paper p={20} shadow="sm" withBorder>
                                        <Stack>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Môn thi:</Text>TRR - Toán rời rạc
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Nhóm:</Text>room1
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Ngày thi:</Text>21/05/2025
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Giờ thi:</Text>09:00
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Thời gian làm bài:</Text>90 phút
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Điểm:</Text>7.5
                                            </Group>
                                        </Stack>
                                    </Paper>

                                    <Paper p={20} shadow="sm" withBorder>
                                        <Stack>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Môn thi:</Text>XSTK - Xác suất thống kê
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Nhóm:</Text>room1
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Ngày thi:</Text>21/05/2025
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Giờ thi:</Text>09:00
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Thời gian làm bài:</Text>90 phút
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Điểm:</Text>7.5
                                            </Group>
                                        </Stack>
                                    </Paper>

                                    <Paper p={20} shadow="sm" withBorder>
                                        <Stack>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Môn thi:</Text>THDC - Tin học đại cương
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Nhóm:</Text>room1
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Ngày thi:</Text>21/05/2025
                                            </Group>
                                            <Group w={{ base: "100%", lg: "50%" }} gap={5}>
                                                <Text fw={500}>Giờ thi:</Text>09:00
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Thời gian làm bài:</Text>90 phút
                                            </Group>
                                            <Group w={{ base: "100%" }} gap={5}>
                                                <Text fw={500}>Điểm:</Text>8.0
                                            </Group>
                                        </Stack>
                                    </Paper>
                                </SimpleGrid>


                            </Stack>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Box>
        </>
    );
}
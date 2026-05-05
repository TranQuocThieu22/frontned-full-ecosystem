import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { ENUM_EVENT_COMPLAINT_STATUS } from "@/constants/enum/global";
import { EventComplaint } from "@/interfaces/eventComplaint";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { Box, Card, Divider, Grid, Group, Paper, Stack, Text, Badge, Title, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";

export default function HandleComplaintButtonUpdate({ values }: { values: EventComplaint }) {
    const { colorScheme } = useMantineColorScheme();

    const form = useForm<EventComplaint>({
        initialValues: values,
        validate: {}
    });

    useEffect(() => {
        form.setValues(values);
    }, [values]);

    const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <Text size="sm" c="dimmed" fw={500}>{label}</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 9 }}>
                {children}
            </Grid.Col>
        </>
    );

    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form}
            onSubmit={async () => {
                return await service_eventComplaint.complaintProcess(form.values);
            }}
            modalProps={{
                size: "70%",
                title: "Xử lý khiếu nại"
            }}
        >
            <Stack gap="lg">
                {/* Student Information Section */}
                <Card
                    withBorder
                    radius="md"
                    p="lg"
                    style={{
                        backgroundColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-6)'
                            : 'var(--mantine-color-gray-0)',
                        borderColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-4)'
                            : undefined
                    }}
                >
                    <Group justify="space-between" mb="md">
                        <Title order={5}>Thông tin sinh viên</Title>
                    </Group>

                    <Grid gutter="md">
                        <InfoRow label="Sinh viên">
                            <Text fw={600}>
                                {form.values ? `${form.values?.studentCode} - ${form.values?.studentName}` : "Không xác định"}
                            </Text>
                        </InfoRow>

                        <InfoRow label="Khoa">
                            <Text>{form.values ? `${form.values.facultyName}` : "Không xác định"}</Text>
                        </InfoRow>

                        <InfoRow label="Điểm hiện tại">
                            <Text fw={600}>
                                {form.values?.point || 0}
                            </Text>
                        </InfoRow>
                        <InfoRow label="Điểm cần khiếu nại">
                            <Text fw={600}>
                                {form.values?.complaintPoint}
                            </Text>
                        </InfoRow>
                    </Grid>
                </Card>

                {/* Activity Details Section */}
                <Card
                    withBorder
                    radius="md"
                    p="lg"
                    style={{
                        borderColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-4)'
                            : undefined
                    }}
                >
                    <Title order={5} mb="md">Chi tiết hoạt động</Title>

                    <Grid gutter="md">
                        <InfoRow label="Điều">
                            <Box>
                                <Text fw={600}>{form.values.standardCode} - {form.values.standardName}</Text>
                            </Box>
                        </InfoRow>

                        <InfoRow label="Hoạt động">
                            <Paper
                                withBorder
                                p="sm"
                                radius="sm"
                                style={{
                                    backgroundColor: colorScheme === "dark"
                                        ? 'var(--mantine-color-dark-7)'
                                        : 'var(--mantine-color-gray-0)',
                                    borderColor: colorScheme === "dark"
                                        ? 'var(--mantine-color-dark-5)'
                                        : undefined
                                }}
                            >
                                <Text fw={600} size="sm" mb={4}>{form.values?.eventCode}</Text>
                                <CustomHtmlWrapper html={form.values?.eventName || ""} />
                            </Paper>
                        </InfoRow>

                        <InfoRow label="Nội dung khiếu nại">
                            <Paper
                                withBorder
                                p="sm"
                                radius="sm"
                                style={{
                                    backgroundColor: colorScheme === "dark"
                                        ? 'var(--mantine-color-dark-7)'
                                        : 'var(--mantine-color-blue-0)',
                                    borderColor: colorScheme === "dark"
                                        ? 'var(--mantine-color-dark-5)'
                                        : 'var(--mantine-color-blue-2)'
                                }}
                            >
                                <Text size="sm">{form.values?.description}</Text>
                            </Paper>
                        </InfoRow>

                        <InfoRow label="File minh chứng">
                            {form.values?.path == null || form.values.path == "" ? (
                                <Text size="sm" c="dimmed">Không có file đính kèm</Text>
                            ) : (
                                <CustomButtonViewFileAPI
                                    buttonProps={{
                                        fullWidth: true
                                    }}
                                    filePath={form.values.path}
                                />
                            )}
                        </InfoRow>
                    </Grid>
                </Card>

                <Divider
                    my="md"
                    label={
                        <Text size="sm" fw={600} c="dimmed">
                            PHẢN HỒI KHIẾU NẠI
                        </Text>
                    }
                    labelPosition="center"
                />

                {/* Response Section */}
                <Card
                    withBorder
                    radius="md"
                    p="lg"
                    style={{
                        backgroundColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-6)'
                            : 'var(--mantine-color-gray-0)',
                        borderColor: colorScheme === "dark"
                            ? 'var(--mantine-color-dark-4)'
                            : undefined
                    }}
                >
                    <Grid gutter="lg">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="xs">
                                <Text size="sm" fw={600}>Điểm mới <Text component="span" c="red">*</Text></Text>
                                <CustomNumberInput
                                    min={0}
                                    max={1000}
                                    allowNegative={false}
                                    placeholder="Nhập điểm mới"
                                    value={form.values.newPoint}
                                    onChange={(value: any) => form.setFieldValue("newPoint", value.toString())}
                                />
                            </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="xs">
                                <Text size="sm" fw={600}>Trạng thái <Text component="span" c="red">*</Text></Text>
                                <CustomSelect
                                    placeholder="Chọn trạng thái"
                                    data={Object.keys(ENUM_EVENT_COMPLAINT_STATUS)
                                        .filter(key => isNaN(Number(key)))
                                        .map(key => ({
                                            label: key,
                                            value: ENUM_EVENT_COMPLAINT_STATUS[key as keyof typeof ENUM_EVENT_COMPLAINT_STATUS].toString()
                                        }))
                                    }
                                    clearable={false}
                                    value={form.values?.status?.toString() || null}
                                    onChange={(value: any) => form.setFieldValue("status", parseInt(value))}
                                />
                            </Stack>
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Stack gap="xs">
                                <Text size="sm" fw={600}>Ghi chú</Text>
                                <CustomTextArea
                                    placeholder="Nhập ghi chú về quyết định xử lý khiếu nại..."
                                    minRows={4}
                                    {...form.getInputProps("note")}
                                    value={form.values?.note || ""}
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Stack>
        </CustomButtonCreateUpdate>
    );
}

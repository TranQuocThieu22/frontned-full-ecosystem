"use client"
import { service_eventComplaint } from "@/api/services/service_eventComplaint";
import { Button, FileInput, Group, Text, Textarea, Stack, Card, Badge, Divider, Paper, Box, Alert, Title, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconSend, IconAlertCircle, IconFileUpload } from "@tabler/icons-react";
import { IComplaintCreateViewModel } from "./Interfaces/IComplaintCreateViewModel";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";


interface IProps {
    evidence: any;
}

export default function ComplaintButton({ evidence }: IProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const colorTheme = useMantineColorScheme()
    const form = useForm<IComplaintCreateViewModel>({
        initialValues: {
            complaintpoint: undefined,
            description: '',
            fileDetail: {
                fileName: '',
                fileExtension: '',
                fileBase64String: ''
            }
        },
        validate: {
            complaintpoint: (value) => {
                if (value === null || value === undefined) return 'Điểm không được để trống'
                else if (value > evidence.maxPoint) return 'Điểm khiếu nại không được vượt quá điểm hiện tại'
                return null
            },
            description: (value) => value ? null : 'Nội dung khiếu nại không được để trống'
        }
    });

    const handleOpenModal = () => {
        form.reset();
        open();
    };

    const handleSubmitComplaint = async () => {
        const validation = form.validate();
        if (validation.hasErrors) {
            return;
        }

        try {
            const complaintData: IComplaintCreateViewModel = {
                eventCode: evidence.eventCode,
                description: form.values.description,
                studentId: evidence.studentId || 0,
                point: evidence.point,
                complaintpoint: form.values.complaintpoint,
            };

            if (form.values.fileDetail instanceof File) {
                complaintData.fileDetail = await fileUtils.fileToAQDocumentType(form.values.fileDetail);
            }

            const response = await service_eventComplaint.create(complaintData);

            if (response.data.isSuccess) {
                notifications.show({
                    title: 'Gửi khiếu nại thành công',
                    message: 'Khiếu nại của bạn đã được gửi đi và đang chờ xử lý',
                    color: 'green'
                });
                close();
            } else {
                notifications.show({
                    title: 'Gửi khiếu nại thất bại',
                    message: response.data.message || 'Đã có lỗi xảy ra',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Gửi khiếu nại thất bại',
                message: 'Đã có lỗi xảy ra khi gửi khiếu nại',
                color: 'red'
            });
        }
    };

    return (
        <CustomButtonModal
            buttonProps={{
                actionType: "default",
                children: "Khiếu nại",
                variant: "light",
                color: "orange",
                size: "sm"
            }}
            modalProps={{
                title: "Gửi khiếu nại",
                size: "90%"
            }}
            disclosure={[opened, { open: handleOpenModal, close, toggle: handleOpenModal }]}
        >
            <Stack gap="lg">
                {/* Activity Information Card */}
                <Card
                    withBorder
                    radius="md"
                    p="md"
                    style={{
                        backgroundColor: colorTheme.colorScheme === "dark" ?
                            'var(--mantine-color-dark-5)' :
                            'var(--mantine-color-blue-0)'
                    }}>
                    <Title order={5}>Thông tin hoạt động tham dự</Title>
                    <Box mb="md">
                        <CustomHtmlWrapper html={evidence.eventName!} />
                    </Box>

                    <Group align="center">
                        <Text size="xl" fw={600}>Điểm hiện tại:</Text>
                        <Text size="xl" fw={600} c="red" >
                            {evidence.point} điểm
                        </Text>
                    </Group>

                </Card>

                {/* Alert Info */}
                <Alert
                    icon={<IconAlertCircle size={18} />}
                    title="Lưu ý"
                    color="orange"
                    variant="light"
                    radius="md"
                >
                    <Text size="sm">
                        Vui lòng nhập đầy đủ thông tin và đính kèm file minh chứng (nếu có) để khiếu nại được xử lý nhanh chóng.
                    </Text>
                </Alert>

                <Divider
                    label={
                        <Text size="sm" fw={600} c="dimmed">
                            THÔNG TIN KHIẾU NẠI
                        </Text>
                    }
                    labelPosition="center"
                />

                {/* Form Section */}
                <Paper withBorder p="md" radius="md">
                    <Stack gap="lg">

                        <Box>
                            <Text size="sm" fw={600} mb="xs">
                                Điểm cần khiếu nại <Text component="span" c="red">*</Text>
                            </Text>
                            <CustomNumberInput
                                placeholder="Nhập điểm mong muốn"
                                description={`Điểm tối đa: ${evidence.maxPoint}`}
                                min={0}
                                max={evidence.maxPoint}
                                {...form.getInputProps('complaintpoint')}
                            />
                        </Box>

                        <Box>
                            <Text size="sm" fw={600} mb="xs">
                                Nội dung khiếu nại <Text component="span" c="red">*</Text>
                            </Text>
                            <Textarea
                                placeholder="Vui lòng mô tả chi tiết lý do khiếu nại của bạn..."
                                minRows={5}
                                {...form.getInputProps('description')}
                            />
                        </Box>

                        <Box>
                            <Text size="sm" fw={600} mb="xs">
                                File minh chứng (không bắt buộc)
                            </Text>
                            <FileInput
                                placeholder="Chọn file (PNG, JPG, PDF)"
                                accept="image/png,image/jpeg,application/pdf"
                                leftSection={<IconFileUpload size={18} />}
                                {...form.getInputProps('fileDetail')}
                            />
                            <Text size="xs" c="dimmed" mt="xs">
                                Định dạng hỗ trợ: PNG, JPG, PDF. Kích thước tối đa: 10MB
                            </Text>
                        </Box>
                    </Stack>
                </Paper>

                {/* Action Buttons */}
                <Group justify="flex-end" mt="md">
                    <Button
                        variant="default"
                        onClick={close}
                        size="md"
                    >
                        Hủy
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmitComplaint}
                        leftSection={<IconSend size={18} />}
                        size="md"
                    >
                        Gửi khiếu nại
                    </Button>
                </Group>
            </Stack>
        </CustomButtonModal>
    );
}

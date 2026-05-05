import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface IProps {
    values?: SRMTaskProposal;
}

export default function CheckStudentProposalViewButton({ values }: IProps) {
    const form = useForm<SRMTaskProposal>({
        mode: "uncontrolled"
    });

    useEffect(() => {
        if (!values) return;
        form.setInitialValues(values);
        form.setValues(values);
    }, [values]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "70vw",
                title: "Chi tiết đề xuất"
            }}
            scrollAreaAutosizeProps={{
                h: "auto"
            }}
            onSubmit={() => { }}
            actionIconProps={{
                actionType: "view",
                toolTipProps: { label: "Xem" },
            }}
            submitButtonProps={{
                hidden: true,
            }}
            form={form}
            isUpdate={true}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack>
                        <CustomTextInput
                            label="Tên đề tài"
                            {...form.getInputProps("name")}
                            readOnly={true}
                        />
                        <CustomTextInput
                            label="Lĩnh vực"
                            {...form.getInputProps("srmArea.name")}
                            readOnly={true}
                        />
                        <CustomTextArea
                            label="Tính cấp thiết"
                            {...form.getInputProps("necessity")}
                            minRows={3}
                            readOnly={true}
                        />
                        <CustomTextArea
                            label="Mục tiêu"
                            {...form.getInputProps("objective")}
                            minRows={3}
                            readOnly={true}
                        />
                        <CustomTextArea
                            label="Kết quả chính"
                            {...form.getInputProps("result")}
                            minRows={3}
                            readOnly={true}
                        />
                        <CustomTextArea
                            label="Yêu cầu đối với kết quả"
                            {...form.getInputProps("requirement")}
                            minRows={3}
                            readOnly={true}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack>
                        <CustomNumberInput
                            label="Tổng kinh phí dự kiến"
                            {...form.getInputProps("estimatedBudget")}
                            inputType="currency"
                            readOnly={true}
                        />
                        <CustomTextInput
                            label="Thời gian thực hiện (tháng)"
                            {...form.getInputProps("duration")}
                            readOnly={true}
                        />
                        <MonthPickerInput
                            readOnly={true}
                            placeholder="Chọn tháng/năm"
                            label="Từ tháng/năm"
                            defaultLevel="year"
                            valueFormat="MM/YYYY"
                            locale="vi"
                            value={form.values.startDate ?? null}
                        />
                        <MonthPickerInput
                            readOnly={true}
                            placeholder="Chọn tháng/năm"
                            label="Đến tháng/năm"
                            defaultLevel="year"
                            valueFormat="MM/YYYY"
                            locale="vi"
                            value={form.values.endDate ?? null}
                        />
                        <CustomTextInput
                            label="Sinh viên đăng ký"
                            value={`${form.values.user?.code} - ${form.values.user?.fullName}`}
                            readOnly={true}
                        />
                        <CustomTextArea
                            label="Phương án ứng dụng"
                            {...form.getInputProps("expectedOutput")}
                            minRows={3}
                            readOnly={true}
                        />
                        <Stack gap={0}>
                            <Text size="sm" fw={500}>File Phiếu đề xuất</Text>
                            <Group>
                                <CustomButtonViewFileAPI filePath={form.values.attachmentPath} />
                            </Group>
                        </Stack>
                    </Stack>
                </Grid.Col>
            </Grid>
        </CustomButtonCreateUpdate>
    )
}
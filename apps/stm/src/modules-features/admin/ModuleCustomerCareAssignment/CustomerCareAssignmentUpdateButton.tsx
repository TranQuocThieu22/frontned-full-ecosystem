import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { Grid, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ICustomerFeedbackRequestInfoViewModal } from "./interfaces/ICustomerFeedbackRequestInfoViewModal";
import StudentListTableModalButton from "./StudentListTableModalButton";

const channelOptions = [
    { label: "Email", value: "Email" },
    { label: "Điện thoại", value: "Điện thoại" },
    { label: "Trực tiếp", value: "Trực tiếp" },
    { label: "Hệ thống", value: "Hệ thống" }
];

const requestTypeOptions = [
    { label: "Khiếu nại", value: "Khiếu nại" },
    { label: "Yêu cầu hỗ trợ", value: "Yêu cầu hỗ trợ" },
    { label: "Chăm sóc chủ động (Học sinh mới)", value: "Chăm sóc chủ động (Học sinh mới)" },
    { label: "Báo nghỉ học", value: "Báo nghỉ học" },
]

const priorityLevelOptions = [
    { label: "Thấp", value: "Thấp" },
    { label: "Trung bình", value: "Trung bình" },
    { label: "Cao", value: "Cao" }
];

const studentOptions = [
    { label: "Nguyễn Văn A - HS001", value: "HS001" },
    { label: "Trần Thị B - HS002", value: "HS002" }
];

const receiverOptions = [
    { label: "Nguyễn Thị A (P.KH)", value: "Nguyễn Thị A (P.KH)" },
    { label: "Hệ thống tự động", value: "Hệ thống tự động" },
    { label: "Trần Thị B (QLCL)", value: "Trần Thị B (QLCL)" },
    { label: "Phạm Thị C (QLCL)", value: "Phạm Thị C (P.HK)" },
];

export default function CustomerCareAssignmentUpdateButton({ data }: { data?: ICustomerFeedbackRequestInfoViewModal }) {
    const form = useForm<ICustomerFeedbackRequestInfoViewModal>({
        initialValues: data ?? {}
    });

    return (
        <MyActionIconUpdate onSubmit={() => { }}
            modalSize={"70vw"}
            form={form}
            title="Chi tiết yêu cầu"
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md" >
                        <Group align="flex-end">
                            <MyTextInput flex={1} label="Học sinh"
                                onChange={(e) => {
                                }}
                                placeholder="Chọn học sinh"
                                value={form.values.studentName}
                            />
                            <StudentListTableModalButton />
                        </Group>
                        <MyTextInput
                            label="Tiêu đề"
                            {...form.getInputProps("requestContent")}
                        />

                        <MyTextArea
                            label="Ghi chú"
                            minRows={6}
                            {...form.getInputProps("detailContent")}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md" >
                        <MySelect
                            label="Kênh tiếp nhận"
                            data={channelOptions}
                            {...form.getInputProps("receiveChannel")}
                            clearable={false}
                        />

                        <MySelect
                            label="Người tiếp nhận"
                            data={receiverOptions}
                            {...form.getInputProps("receiver")}
                            clearable={false}
                        />

                        <MySelect
                            label="Loại yêu cầu"
                            data={requestTypeOptions}
                            {...form.getInputProps("requestType")}
                            clearable={false}
                        />

                        <MySelect
                            label="Mức độ ưu tiên"
                            data={priorityLevelOptions}
                            {...form.getInputProps("priorityLevel")}
                            clearable={false}
                        />
                    </Stack>
                </Grid.Col>
            </Grid>
        </MyActionIconUpdate>
    );
}


import { Flex, Grid, MultiSelect, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyFileInput, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ILectureProposalRegistrationInfoViewModel, IScienceFieldViewModel } from "./interfaces/ILectureProposalRegistrationViewModel";
import LectureProposalRegistrationMembers from "./LectureProposalRegistrationMembers";

export default function LectureProposalRegistrationCreate() {
    const form = useForm<ILectureProposalRegistrationInfoViewModel>({})

    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" }
    ]

    return (
        <MyButtonCreate modalSize={'70%'} objectName="Chi tiết đăng ký thực hiện bài giảng" form={form} onSubmit={() => { }}>
            <MyTab tabList={tabData}>
                <Tabs.Panel value="Thông tin chung">
                    <Grid gutter="xl">
                        <Grid.Col span={6}>
                            <MyTextInput label="Mã bài giảng (Nếu có)" {...form.getInputProps("code")} />
                            <MyTextInput label="Tên bài giảng" {...form.getInputProps("name")} />
                            <Flex direction="column" gap={4} mt={4}>
                                <Text size="sm" fw={500}>Lĩnh vực Khoa học</Text>
                                <MultiSelect placeholder="Chọn lĩnh vực Khoa học" data={mockScienceField.map(item => ({ value: item.code, label: item.name }))} {...form.getInputProps("scienceFieldCodes")} />
                            </Flex>
                            {/* <MyMultiSelect label="Lĩnh vực Khoa học" {...form.getInputProps("scienceFieldCode")} data={mockScienceField.map(item => ({ value: item.code, label: item.name }))} /> */}
                            {/* <MySelect label="Lĩnh vực Khoa học" {...form.getInputProps("scienceFieldCode")} data={mockScienceField.map(item => ({ value: item.code, label: item.name }))} /> */}
                            <MyTextArea label="Mục tiêu bài giảng" rows={10} {...form.getInputProps("objective")} />
                            <MyTextInput label="Đối tượng Học viên" {...form.getInputProps("targetAudience")} />
                            <MyDateInput label="Thời gian bắt đầu dự kiến" {...form.getInputProps("startDate")} />
                            <MyDateInput label="Thời gian hoàn thành dự kiến" {...form.getInputProps("endDate")} />
                            <MyTextInput label="Kinh phí dự kiến" type="number" {...form.getInputProps("budget")} />
                            <MyTextInput label="Nhu cầu hỗ trợ kỹ thuật/công nghệ" {...form.getInputProps("requirements")} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <MyTextArea label="Đề cương sơ bộ/Tóm tắt nội dung" minRows={20} maxRows={20} {...form.getInputProps("summary")} />
                            <MyFileInput label="Văn bản" {...form.getInputProps("file")} />
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <LectureProposalRegistrationMembers />
                </Tabs.Panel>
            </MyTab>
        </MyButtonCreate>
    );
}


const mockScienceField: IScienceFieldViewModel[] = [
    {
        id: 1,
        name: "Công nghệ thông tin",
        code: "CNTT",
    },
    {
        id: 2,
        name: "Khoa học dữ liệu",
        code: "KHD",
    },
    {
        id: 3,
        name: "Khoa học máy tính",
        code: "KHM",
    },
    {
        id: 4,
        name: "Y học",
        code: "YHC",
    },
    {
        id: 5,
        name: "Trí tuệ nhân tạo",
        code: "AI",
    },
    {
        id: 6,
        name: "Khoa học quản trị",
        code: "KQT",
    }
]


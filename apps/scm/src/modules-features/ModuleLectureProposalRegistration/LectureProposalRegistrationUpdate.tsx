import { Flex, Grid, MultiSelect, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ILectureProposalRegistrationInfoViewModel, ILectureProposalRegistrationMemberViewModel, IScienceFieldViewModel } from "./interfaces/ILectureProposalRegistrationViewModel";
import LectureProposalRegistrationMembers from "./LectureProposalRegistrationMembers";

interface I extends ILectureProposalRegistrationInfoViewModel {
    file?: File
}

export default function LectureProposalRegistrationUpdate({ values }: { values: ILectureProposalRegistrationInfoViewModel }) {
    const form = useForm<I>({
        initialValues: {
            ...values,
            file: new File([], values.filePath?.split("/")[values.filePath.split("/").length - 1]!),
        }
    })

    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" }
    ]

    return (
        <MyActionIconUpdate modalSize="70%" title="Chi tiết đăng ký thực hiện bài giảng" form={form} onSubmit={() => { }}>
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
                            <MyTextArea label="Mục tiêu bài giảng" rows={10} {...form.getInputProps("objective")} />
                            <MyTextInput label="Đối tượng Học viên" {...form.getInputProps("targetAudience")} />
                            <MyDateInput label="Thời gian bắt đầu dự kiến" {...form.getInputProps("startDate")} />
                            <MyDateInput label="Thời gian hoàn thành dự kiến" {...form.getInputProps("endDate")} />
                            <MyTextInput label="Kinh phí dự kiến" type="number" {...form.getInputProps("budget")} />
                            <MyTextInput label="Nhu cầu hỗ trợ kỹ thuật/công nghệ" {...form.getInputProps("requirements")} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <MyTextArea label="Đề cương sơ bộ/Tóm tắt nội dung" minRows={20} maxRows={20} {...form.getInputProps("summary")} />
                            <MyFileInput label="Đính kèm tài liệu" {...form.getInputProps("file")} />
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <LectureProposalRegistrationMembers data={values.members} />
                </Tabs.Panel>
            </MyTab>
        </MyActionIconUpdate>
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

const defaultMember: ILectureProposalRegistrationMemberViewModel[] = [
    {
        id: 1,
        name: "Tô Ngọc Bảo",
        code: "GV0258",
        unit: "KCNTT",
        role: "Trưởng nhóm",
    },
    {
        id: 2,
        name: "Tô Lanh",
        code: "GV0259",
        unit: "KDDT",
        role: "Thành viên",
    },
]

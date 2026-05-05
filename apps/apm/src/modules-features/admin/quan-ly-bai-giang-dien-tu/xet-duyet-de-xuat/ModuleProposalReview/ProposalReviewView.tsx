import { Flex, Grid, Modal, MultiSelect, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { MyActionIcon, MyDateInput, MyFileInput, MyFlexColumn, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ProposalReviewViewModel, ScienceFieldViewModel } from "./interfaces/ProposalReviewViewModel";
import LectureProposalRegistrationMembers from "./ProposalReviewMembers";

interface I extends ProposalReviewViewModel {
    file?: File
}

export default function ProposalReviewView({ data }: { data: ProposalReviewViewModel }) {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.filePath?.split("/")[data.filePath.split("/").length - 1]!),
        }
    })

    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" }
    ]

    return (
        <>
            <MyActionIcon onClick={open} crudType="default" color="indigo" >
                <IconEye />
            </MyActionIcon>
            <Modal
                fullScreen={false}
                size="70%"
                title={`Chi tiết đăng ký thực hiện bài giảng`}
                opened={opened}
                onClose={close}>
                <MyFlexColumn>
                    <form onSubmit={form.onSubmit((values) => {
                        console.log(values)
                    })}>
                        <MyTab tabList={tabData}>
                            <Tabs.Panel value="Thông tin chung">
                                <Grid gutter="xl">
                                    <Grid.Col span={6}>
                                        <MyTextInput readOnly label="Mã bài giảng (Nếu có)" value={data.code} />
                                        <MyTextInput readOnly label="Tên bài giảng" value={data.name} />
                                        <Flex direction="column" gap={4} mt={4}>
                                            <Text size="sm" fw={500}>Lĩnh vực Khoa học</Text>
                                            <MultiSelect placeholder="Chọn lĩnh vực Khoa học" data={mockScienceField.map(item => ({ value: item.code, label: item.name }))} value={data.scienceFieldCodes} />
                                        </Flex>
                                        <MyTextArea readOnly label="Mục tiêu bài giảng" rows={10} value={data.objective} />
                                        <MyTextInput readOnly label="Đối tượng Học viên" value={data.targetAudience} />
                                        <MyDateInput readOnly label="Thời gian bắt đầu dự kiến" value={data.startDate} />
                                        <MyDateInput readOnly label="Thời gian hoàn thành dự kiến" value={data.endDate} />
                                        <MyTextInput readOnly label="Kinh phí dự kiến" type="number" value={data.budget} />
                                        <MyTextInput readOnly label="Nhu cầu hỗ trợ kỹ thuật/công nghệ" value={data.requirements} />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <MyTextArea readOnly label="Đề cương sơ bộ/Tóm tắt nội dung" minRows={20} maxRows={20} {...form.getInputProps("summary")} />
                                        <MyFileInput readOnly label="Đính kèm tài liệu" {...form.getInputProps("file")} />
                                    </Grid.Col>
                                </Grid>
                            </Tabs.Panel>
                            <Tabs.Panel value="Thành viên">
                                <LectureProposalRegistrationMembers data={data.members} />
                            </Tabs.Panel>
                        </MyTab>
                    </form>
                </MyFlexColumn>
            </Modal>
        </>
    );
}


const mockScienceField: ScienceFieldViewModel[] = [
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
    },
    {
        id: 7,
        name: "Tâm lý học",
        code: "TLH",
    },
    {
        id: 8,
        name: "Văn học",
        code: "VH",
    }
]

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { SimpleGrid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
    MyActionIcon,
    MyActionIconDelete,
    MyButtonModal,
    MyDataTable,
    MyFileInput,
    MySelect,
    MyTextArea,
    MyTextInput
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I_ProposalMemberTable, proposalTableMemberMockData, roleOptions } from "./ProposalTable";
import { IF12_2_1ReadNewCurriculum, needOfUsageEnum } from "../../giao-trinh/dang-ky-&-de-xuat/dang-ky-giao-trinh-moi/F12_2_1ReadNewCurriculum";
export default function ProposalTableDetail({ values }: { values: IF12_2_1ReadNewCurriculum }) {
    const disclosure = useDisclosure(false);
    const Form = useForm<IF12_2_1ReadNewCurriculum>({
        initialValues:
            values,
    });
    const query = useQuery<I_ProposalMemberTable[]>({
        queryKey: ['ProposalMemberQuery'],
        queryFn: async () => {
            return proposalTableMemberMockData ?? [];
        }
    });
    const columns = useMemo<MRT_ColumnDef<I_ProposalMemberTable>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            id: "name",
            accessorFn: row => (
                <MySelect
                    data={["Tô Ngọc Báo", "Tô Lanh"]}
                    value={row.name}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Đơn vị",
            id: "department",
            accessorKey: "department",
        },
        {
            header: "Email",
            id: "email",
            accessorKey: "email",
        },
        {
            header: "Số điện thoại vai trò",
            id: "phone",
            accessorKey: "phone",
        },
        {
            header: "Vai trò",
            id: "role",
            accessorFn: row => (
                <MySelect
                    data={roleOptions}
                    value={row.role}
                    onChange={() => { }}
                />
            ),
        },
    ], []);
    return (
        <MyButtonModal variant='outline' color='blue' label="Xem chi tiết" title="Chi tiết đăng ký đề xuất" disclosure={disclosure} modalSize={"80%"}>
            <Tabs defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab value="general">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab value="members">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general">
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextInput label='Mã đề xuất' {...Form.getInputProps("suggestionCode")} />
                            <MyTextInput label='Tên Giáo Trình (Tiếng Việt)' {...Form.getInputProps("curriculumVietnameseName")} />
                            <MyTextInput label='Tên Giáo Trình (Tiếng Anh)' {...Form.getInputProps("curriculumEnglishName")} />
                            <MySelect label='Lĩnh vực Khoa học' data={mockDataFieldOfStudy} defaultValue={mockDataFieldOfStudy} {...Form.getInputProps("fieldOfStudy")} />
                            <MySelect label='Chuyên ngành áp dụng' data={[]} />
                            <MyTextArea label='Mô tả tóm tắt Giáo trình' {...Form.getInputProps("curriculumDescription")} />
                            <MyTextArea label='Mục tiêu của Giáo trình' {...Form.getInputProps("applicationOfCurriculum")} />
                        </Stack>
                        <Stack>
                            <MyTextInput label='Đối tượng sử dụng' {...Form.getInputProps("targetOfCurriculum")} />
                            <MyTextInput label='Dự kiến Số chương '{...Form.getInputProps("expectedChapters")} />
                            <MyTextInput label='Dự kiến Số trang ' {...Form.getInputProps("expectedPages")} />
                            <MyTextInput label='Dự kiến thời gian hoàn thành' {...Form.getInputProps("expectedCompletionMonth")} />
                            <MySelect label='Nhu cầu sử dụng' data={Object.values(needOfUsageEnum).map(value => ({ value, label: value }))} {...Form.getInputProps("needOfUsage")} />
                            <MyFileInput label='File đính kèm' {...Form.getInputProps("fileAttachment")} />
                        </Stack>
                    </SimpleGrid>
                </Tabs.Panel>
                <Tabs.Panel value="members">
                    <MyDataTable
                        columns={columns}
                        data={query.data!}
                        enableRowSelection={false}
                        enableColumnActions={false}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <MyActionIconDelete onSubmit={() => { }} />
                            </MyCenterFull>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                        )}
                    >
                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyButtonModal>
    )
}

const mockDataFieldOfStudy = [
    { value: "Khoa học máy tính", label: "Khoa học máy tính" },
]
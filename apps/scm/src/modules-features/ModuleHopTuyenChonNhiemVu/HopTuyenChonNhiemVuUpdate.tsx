import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyActionIconUpdate, MyButton, MyButtonDeleteList, MyCheckbox, MyDataTable, MyFileInput, MySelect, MyTab, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { HopTuyenChonNhiemVuViewModel, ThanhVienViewModel } from "./interfaces/HopTuyenChonNhiemVuViewModel";

interface I extends HopTuyenChonNhiemVuViewModel {
    file?: File
}

export default function HopTuyenChonNhiemVuUpdate({ data }: { data: HopTuyenChonNhiemVuViewModel }) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.pathFile?.split("/")[data.pathFile.split("/").length - 1]!),
        }
    })

    const tabsList = [
        { label: "Thông tin chung", value: "Thông tin chung" },
        { label: "Thành viên", value: "Thành viên" },
    ]

    const Query = useQuery({
        queryKey: ['thanhVienHoiDong'],
        queryFn: () => thanhVienHoiDong,
    })

    const columns = useMemo<MRT_ColumnDef<ThanhVienViewModel>[]>(() => [
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Vai trò",
            accessorKey: "role",
        },
        {
            header: "Phù hợp",
            accessorKey: "suitability",
            accessorFn(originalRow) {
                return <MyCheckbox
                    defaultChecked={originalRow.suitability}
                />
            },
        },
        {
            header: "Kiến nghị",
            accessorKey: "comment",
            accessorFn(originalRow) {
                return <MyTextArea
                    label=" "
                    defaultValue={originalRow.comment}
                />
            },
            size: 300
        },
    ], [])

    return (
        <MyActionIconUpdate
            title="Chi tiết nhận xét của hội đồng tư vấn"
            form={form}
            modalSize="80%"
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <MyTab tabList={tabsList} variant="outline" defaultValue="Thông tin chung">
                <Tabs.Panel value="Thông tin chung">
                    <Stack>
                        <Grid columns={12}>
                            <Grid.Col span={6}>
                                <MyTextInput label="Mã đề xuất" {...form.getInputProps('code')} />
                                <MyTextInput label="Tên đề xuất" {...form.getInputProps('name')} />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <MySelect
                                    label="Đánh giá phù hợp của hội đồng"
                                    {...form.getInputProps('suitability')}
                                    data={[
                                        { value: "Phù hợp", label: "Phù hợp" },
                                        { value: "Không phù hợp", label: "Không phù hợp" },
                                    ]}
                                />
                                <MyTextArea
                                    label="Kiến nghị chung"
                                    {...form.getInputProps('comment')}
                                />
                                <MyFileInput
                                    label="File hồ sơ hội đồng"
                                    {...form.getInputProps('file')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <MyDataTable
                        enableRowSelection={true}
                        enableRowNumbers={false}
                        renderTopToolbarCustomActions={({ table }) => {
                            return <>
                                <MyButton crudType="export" />
                                <MyButtonDeleteList
                                    onSubmit={() => { }}
                                    contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                                />
                            </>

                        }}
                        columns={columns}
                        data={Query.data || []}
                    />
                </Tabs.Panel>
            </MyTab>
        </MyActionIconUpdate>
    )
}

export const thanhVienHoiDong: ThanhVienViewModel[] = [
    {
        id: 1,
        code: "VC001",
        name: "Nguyễn Văn A",
        role: "Chủ tịch",
        suitability: true,
        comment: "Đề tài có tính cấp thiết cao; phù hợp định hướng của trường."
    },
    {
        id: 2,
        code: "VC008",
        name: "Lê Thị Bình",
        role: "Phó Chủ tịch",
        suitability: true,
        comment: "Mô hình ứng dụng rõ ràng. cần làm rõ thêm về nguồn lực triển khai"
    },
    {
        id: 3,
        code: "VC012",
        name: "Trần Văn Cảnh",
        role: "Ủy viên phản biện",
        suitability: false,
        comment: "Phần kinh phí chưa được giải trình chi tiết; yêu cầu làm rõ hiệu quả kinh tế xã hội."
    },
    {
        id: 4,
        code: "VC015",
        name: "Phạm Thị Dung",
        role: "Ủy viên",
        suitability: true,
        comment: "Nghiên cứu có tính đột phá, tiềm năng ứng dụng cao"
    },
    {
        id: 5,
        code: "VC019",
        name: "Hoàng Trung Kiên",
        role: "Thư ký",
        suitability: true,
        comment: "Hồ sơ đầy đủ không có vấn đề về hình thức."
    }
];

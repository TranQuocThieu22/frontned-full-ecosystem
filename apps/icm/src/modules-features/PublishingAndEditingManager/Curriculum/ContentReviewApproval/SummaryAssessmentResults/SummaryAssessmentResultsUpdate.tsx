'use client'
import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyDataTable, MyDateInput, MyNumberInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { AppraisedDraft, MemberEvaluation } from "./SummaryAssessmentResultsLayout";

export default function SummaryAssessmentResultsUpdate({ values }: { values: AppraisedDraft }) {
    const disc = useDisclosure();

    const form = useForm<AppraisedDraft>({
        initialValues: values
    })


    const columnsUser = useMemo<MRT_ColumnDef<MemberEvaluation>[]>(() => [
        {
            accessorKey: 'lecturerCode',
            header: 'Mã thành viên',
        },
        {
            accessorKey: 'name',
            header: 'Tên thành viên',
        },
        {
            accessorKey: 'role',
            header: 'Vai trò trong HĐ TĐ',
        },
        {
            accessorKey: 'score',
            header: 'Điểm Chấm',
            accessorFn: (row) => <MyNumberInput defaultValue={row.score} />
        },
        {
            accessorKey: 'comment',
            header: 'Nhận xét/Góp ý của Thành viên',
            accessorFn: (row) => <MyTextArea label="" defaultValue={row.comment} />
        },
    ], []);

    return (
        <MyButtonModal
            title="Chi tiết hội đồng thẩm định"
            onSubmit={() => { }}
            modalSize="100%"
            disclosure={disc}
            label="Cập nhật"
            variant="transparent"
        >
            <Tabs variant="outline" radius="md" defaultValue="thong-tin">
                <Tabs.List>
                    <Tabs.Tab value="thong-tin" leftSection={<IconInfoCircle size={14} />}>
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab value="thanh-vien" leftSection={<IconUsers size={14} />}>
                        Thành viên
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="thong-tin">
                    <Grid>
                        <Grid.Col span={6}>
                            <MyTextInput
                                mt="xs"
                                label="Mã hội đồng thẩm định"
                                readOnly
                                {...form.getInputProps("councilCode")}
                            />
                            <MyTextInput
                                mt="xs"
                                label="Tên hội đồng thẩm định"
                                readOnly
                                {...form.getInputProps("councilName")}
                            />
                            <MyTextArea
                                mt="xs"
                                label="Đề xuất kết luận"
                                {...form.getInputProps("conclusion")}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <MyDateInput
                                mt="xs"
                                label="Ngày thẩm định"
                                {...form.getInputProps("meetingDate")}
                            />
                            <MyTextInput
                                mt="xs"
                                label="Địa điểm họp"
                                {...form.getInputProps("expectedLocation")}
                            />
                            <MyTextArea
                                mt="xs"
                                label="Nhận xét chi tiết về nội dung"
                                rows={4}
                                {...form.getInputProps("reviewDetail")}
                            />
                        </Grid.Col>

                    </Grid>
                </Tabs.Panel>

                <Tabs.Panel value="thanh-vien">
                    <MyDataTable
                        enableRowSelection
                        enableRowNumbers={false}
                        columns={columnsUser}
                        data={values.members}
                    />
                </Tabs.Panel>
            </Tabs>
            <MyButton onClick={() => { disc[1].close() }} crudType="save"></MyButton>
        </MyButtonModal>
    )
}

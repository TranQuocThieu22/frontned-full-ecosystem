'use client'
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyButton, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { SummaryOfProposed } from "./ReadSummaryOfProposed";


export enum EnumRoleType {
    CHAIRMAN = '1',
    SECRETARY = '2',
    MEMBER = '3',
}

export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.CHAIRMAN]: 'Chủ tịch',
    [EnumRoleType.SECRETARY]: 'Thư ký',
    [EnumRoleType.MEMBER]: 'Ủy viên',
};

export interface I_SummaryOfProposed {
    id?: number;
    code?: string;                   // Mã Hội đồng
    name?: string;                   // Tên Hội đồng thẩm định
    role?: number;
    score?: string;
    comment?: string;
}
export default function SummaryOfProposedUpdate({ data }: { data: SummaryOfProposed }) {
    const form = useForm<SummaryOfProposed>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    const roleOptions = Object.entries(RoleTypeLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }));
    const [members, setMembers] = useState<I_SummaryOfProposed[]>([
        {
            code: "FV.10001",
            name: "GS.Lê Văn X",
            role: 1,
            score: '90',
            comment: 'Nội dung đề cương rõ ràng mục tiêu phù hợp. cần bổ sung thêm ví dụ thực tiễn về chu trình kế toán.',
        },
        {
            code: "GV.20002",
            name: "TS. phạm A",
            role: 3,
            score: '80',
            comment: 'Đề cương đầy đủ, nhưng phần phân tích tài chính có vẻ hơi bị đơn giản. Đề nghị xem xét mở rộng',
        },
        {
            code: "GV.30003",
            name: "TS. hoàng B",
            role: 3,
            score: '85',
            comment: 'Cấu trúc hợp lý, tác giả có kinh nghiệm. nên cân nhắc thêm phần kế toán quốc tế.',
        },
    ]);


    useEffect(() => {
        form.setValues(data);
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<I_SummaryOfProposed>[]>(() => [
        {
            header: "Mã Thành viên",
            accessorKey: "code",
        },
        {
            header: "Tên thành viên",
            accessorKey: "name",
        },
        {
            header: "Vai trò trong hội đồng",
            accessorKey: "role",
            Cell: ({ row }) => (
                <MySelect
                    readOnly
                    data={roleOptions}
                    value={members[row.index]?.role?.toString() || ""}
                />
            ),
        },
        {
            header: "Điểm chấm",
            accessorKey: "score",
            Cell: ({ row }) => (
                <MyTextInput
                    value={members[row.index]?.score || ""}
                    onChange={(e) => {
                        const updated = [...members];

                        if (!updated[row.index]) return;

                        updated[row.index]!.score = e.currentTarget.value;
                        setMembers(updated);
                    }}
                />
            )
        },
        {
            header: "Nhận xét / Góp ý của thành viên",
            accessorKey: "comment",
            Cell: ({ row }) => (
                <MyTextArea
                    value={members[row.index]?.comment || ""}
                    onChange={(e) => {
                        const updated = [...members];

                        if (!updated[row.index]) return;

                        updated[row.index]!.comment = e.currentTarget.value;
                        setMembers(updated);
                    }}
                />
            )
        },
    ], [members]);


    return (
        <Group>
            <MyActionIconUpdate
                title="Chi tiết hội đồng xét duyệt"
                form={form}
                onSubmit={() => {
                }}
                modalSize={"80%"}
            >
                <Tabs defaultValue="tab1" >
                    <Tabs.List >
                        <Tabs.Tab value="tab1" >Thông tin chung</Tabs.Tab>
                        <Tabs.Tab value="tab2" >Thành viên</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="tab1">
                        <SimpleGrid p={"md"} cols={2}>
                            <Stack>
                                <MyTextInput label='Điểm TB Tổng họp đề xuất(tự động)' {...form.getInputProps("proposalscore")} />
                                <MySelect label='Trạng thái hội đồng' data={['Hoàn thành', 'Chờ họp']} defaultValue={data.status} {...form.getInputProps("status")} />
                                <MySelect label='Trạng thái đề xuất' data={['Đã sơ duyệt', 'Đã duyệt']} defaultValue={data.proposalSatus} {...form.getInputProps("proposalSatus")} />
                                <MyTextArea label='Kết luận / khuyến nghị hội đồng(chung)' {...form.getInputProps("conclude")} />

                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày họp' {...form.getInputProps("meetDate")} />
                                <MyTextInput label='Thời gian họp' {...form.getInputProps("meetTime")} />
                                <MyTextInput label='Địa điểm họp' {...form.getInputProps("meetLocation")} />
                                <MyFileInput label='Đính kèm file' />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyDataTable
                            enableRowSelection={false}
                            enableRowNumbers={false}
                            columns={columns}
                            data={members || []}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    )
}

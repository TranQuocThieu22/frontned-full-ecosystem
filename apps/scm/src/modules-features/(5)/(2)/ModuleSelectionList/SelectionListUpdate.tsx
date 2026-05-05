'use client'
import { Button, Checkbox, Group, Select, Tabs, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { useMemo, useState } from "react";
import SelectionListDelete from "./SelectionListDelete";
import { ISelectionList } from "./SelectionListTable";

const memberMock = [
    { code: 'VC001', name: 'Nguyễn Văn A', role: 'Chủ tịch', scores: [true, true, true, true, false, false], suggestion: 'Đề nghị thực hiện' },
    { code: 'VC008', name: 'Lê Thị Bình', role: 'Phó chủ tịch', scores: [true, true, false, true, true, true], suggestion: 'Đề nghị thực hiện' },
    { code: 'VC012', name: 'Trịnh Văn Cảnh', role: 'Ủy viên phản biện', scores: [true, false, true, true, false, false], suggestion: 'Đề nghị không thực hiện' },
    { code: 'VC015', name: 'Phạm Thị Dung', role: 'Ủy viên', scores: [true, true, true, true, true, true], suggestion: 'Đề nghị thực hiện với các điều chỉnh' },
    { code: 'VC019', name: 'Hoàng Trung Kiên', role: 'Thư ký', scores: [true, true, true, true, true, true], suggestion: 'Đề nghị không thực hiện' },
];

const suggestionOptions = [
    'Đề nghị thực hiện',
    'Đề nghị không thực hiện',
    'Đề nghị thực hiện với các điều chỉnh',
];

export default function SelectionListUpdate({ values }: { values: ISelectionList }) {
    const disc = useDisclosure();
    const form = useForm<ISelectionList>({ initialValues: values });
    const [members, setMembers] = useState(memberMock);
    const [file, setFile] = useState<File | null>(null);

    // Table for Thành viên
    const memberRows = members.map((m, idx) => (
        <tr key={m.code}>
            <td>{m.code}</td>
            <td>{m.name}</td>
            <td>{m.role}</td>
            {m.scores.map((checked, i) => (
                <td key={i}>
                    <Checkbox checked={checked} readOnly size="xs" />
                </td>
            ))}
            <td>
                <Select
                    data={suggestionOptions}
                    value={m.suggestion}
                    onChange={val => {
                        const newMembers = [...members];

                        if (!newMembers[idx]) return;

                        newMembers[idx].suggestion = val || '';
                        setMembers(newMembers);
                    }}
                    size="xs"
                />
            </td>
        </tr>
    ));

    const memberColumns = useMemo<MRT_ColumnDef<typeof memberMock[0]>[]>(() => [
        { header: "Mã thành viên", accessorKey: "code" },
        { header: "Tên thành viên", accessorKey: "name" },
        { header: "Vai trò", accessorKey: "role" },
        ...[1, 2, 3, 4, 5, 6].map((idx) => ({
            header: `I.${idx}`,
            accessorKey: `scores[${idx}]`,
            Cell: ({ row }: { row: MRT_Row<typeof memberMock[0]> }) => (
                <Checkbox
                    checked={row.original.scores[idx - 1]}
                    onChange={e => {
                        const newMembers = [...members];

                        if (!newMembers[row.index]) return;

                        newMembers[row.index]!.scores[idx - 1] = e.currentTarget.checked;
                        setMembers(newMembers);
                    }}
                    size="xs"
                />
            )
        })),
        {
            header: "Kiến nghị",
            accessorKey: "suggestion",
            Cell: ({ row }: { row: MRT_Row<typeof memberMock[0]> }) => (
                <Select
                    data={suggestionOptions}
                    value={row.original.suggestion}
                    onChange={val => {
                        const newMembers = [...members];

                        if (!newMembers[row.index]) return;

                        newMembers[row.index]!.suggestion = val || '';
                        setMembers(newMembers);
                    }}
                    size="sm"
                    style={{ minWidth: 200 }}
                />
            )
        }
    ], [members]);


    return (
        <MyButtonModal
            label="Cập nhật"
            color="orange.4"
            disclosure={disc}
            modalSize="70%"
            title="Chi tiết nhận xét của Hội đồng tư vấn"
        >
            <Tabs defaultValue="info">
                <Tabs.List>
                    <Tabs.Tab value="info">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab value="members">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="info" pt="md">
                    <div style={{ background: '#cfe5c1', padding: 24, borderRadius: 8 }}>
                        <Group align="start" grow>
                            <div style={{ flex: 1 }}>
                                <TextInput
                                    label="Mã đề xuất"
                                    {...form.getInputProps('proposalCode')}
                                    mb="md"
                                    readOnly
                                />
                                <TextInput
                                    label="Tên đề tài"
                                    {...form.getInputProps('topicName')}
                                    mb="md"
                                    readOnly
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Select
                                    label="Trạng thái đề nghị của Hội đồng"
                                    data={['Chờ kiểm tra sơ bộ', 'Yêu cầu điều chỉnh sơ bộ', 'Không đạt yêu cầu sơ bộ', 'Chờ Hội đồng tư vấn xét duyệt', 'Đã duyệt', 'Bị từ chối']}
                                    placeholder="Chọn trạng thái"
                                    {...form.getInputProps('status')}
                                    required
                                    mb="md"
                                />
                                <Textarea
                                    label="Yêu cầu điều chỉnh"
                                    minRows={4}
                                    {...form.getInputProps('adjustment')}
                                    mb="md"
                                />
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>File Phiếu nhận xét</div>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{ display: 'none' }}
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
                                        }}
                                    />
                                    <Button
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        Tải lên
                                    </Button>
                                    {file && <span style={{ marginLeft: 8 }}>{file.name}</span>}
                                </div>
                            </div>
                        </Group>
                    </div>
                    <Group justify="flex-end" mt="md">
                        <MyButton type="submit" color="green">Lưu</MyButton>
                    </Group>
                </Tabs.Panel>
                <Tabs.Panel value="members" pt="md">
                    <MyFieldset title={"Danh sách thành viên"}>
                        <MyDataTable
                            enableRowSelection={true}
                            enableRowNumbers={false}
                            columns={memberColumns}
                            data={members}
                            renderTopToolbarCustomActions={({ table }) => (
                                <><MyButton crudType="export" /><SelectionListDelete values={table.getSelectedRowModel().rows.map(row => row.original)} /></>
                            )}
                        />
                    </MyFieldset>
                </Tabs.Panel>
            </Tabs>
        </MyButtonModal>
    );
}
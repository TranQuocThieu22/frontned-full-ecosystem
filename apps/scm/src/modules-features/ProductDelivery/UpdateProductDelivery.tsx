"use client";
import {
    Group,
    Select,
    SimpleGrid,
    Stack,
    Tabs,
    TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useMemo, useState } from "react";

import {
    MyActionIconUpdate,
    MyButton,
    MyDataTable,
    MyDateInput,
    MyFileInput,
    MyFlexColumn,
    MySelect,
    MyTextArea,
    MyTextInput,
} from "aq-fe-framework/components";
import { I_ProdutcDelivery } from "./ReadProductDelivery";
import { IconFile, IconInfoCircle } from "@tabler/icons-react";
// Enums
export enum RequestCodeEnum {
    id1 = 1,
    id2 = 2,
    id3 = 3,
}
export const RequestcodeLabel: Record<RequestCodeEnum, string> = {
    [RequestCodeEnum.id1]: "BT002",
    [RequestCodeEnum.id2]: "BT004",
    [RequestCodeEnum.id3]: "BT007",
};

export interface I_CouncilPayeeMember {
    id?: number;
    code: number;
    name: string;
    purpose: string;
}

export default function ProdutcDeliveryUpdate({ values }: { values: I_ProdutcDelivery }) {
    const form = useForm({ initialValues: values });

    const [memberData, setMemberData] = useState<I_CouncilPayeeMember[]>([{
        id: 1, code: 1, name: "Giáo trình phân tích dữ liệu lớn", purpose: "TS. Hoàng D"
    }, {
        id: 2, code: 2, name: "Giáo trình dược lý học", purpose: "TS.Trần T"
    }, {
        id: 3, code: 3, name: "Giáo trình cơ sở dữ liệu", purpose: "ThS.Lê K"
    }
    ]);

    const Recommentcode = Object.entries(RequestcodeLabel).map(([value, label]) => ({ value, label }));

    const handleMemberChange = useCallback((index: number, field: keyof I_CouncilPayeeMember, value: string) => {
        setMemberData(prev => {
            const updated = [...prev];

            if (updated[index] === undefined) return updated;

            updated[index] = { ...updated[index], [field]: field === 'code' ? Number(value) : value };
            return updated;
        });
    }, []);


    const memberColumns = useMemo(() => [
        {
            header: "Mã Bản thảo",
            accessorKey: "code",
            Cell: ({ row }: any) => (
                <MySelect data={Recommentcode} value={memberData[row.index]?.code.toString() || ""}
                    onChange={(val) => val && handleMemberChange(row.index, "code", val)} />
            )
        },
        {
            header: "Tên giáo trình đề xuất",
            accessorKey: "name",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.name || ""}
                    onChange={(e) => handleMemberChange(row.index, "name", e.currentTarget.value)} />
            )
        },
        {
            header: "Chủ ban biên soạn",
            accessorKey: "purpose",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.purpose || ""}
                    onChange={(e) => handleMemberChange(row.index, "purpose", e.currentTarget.value)} />
            )
        },
    ], [memberData]);

    return (
        <Group>
            <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize="80%" title="Chi tiết phê duyệt chính thức">
                <Tabs defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Tab
                            bg="rgba(131, 204, 235, 0.3)"
                            color="rgba(131, 204, 235, 1)"
                            flex={1}
                            leftSection={<IconInfoCircle />}
                            value="tab1" >Thông tin chung</Tabs.Tab>
                        <Tabs.Tab
                            bg="rgba(247, 216, 54, 0.3)"
                            color="rgba(247, 216, 54, 1)"
                            flex={1}
                            leftSection={<IconFile />}
                            value="tab2" >Danh sách bài giảng điện tử</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="tab1">
                        <SimpleGrid p="md" cols={2}>
                            <Stack>
                                <MyTextInput label="Mã Biên bản" {...form.getInputProps("maBienBanBanGiao")} />
                                <MySelect label="Tên Đơn vị bàn giao" data={["Phòng Quản lý Khoa học", "Phòng ban quản lý CNTT", "Phòng ban quản lý kinh tế học"]}  {...form.getInputProps("donViBanGiao")} />
                                <MySelect label="Đơn vị tiếp nhận" data={["Nhà xuất bản Giáo dục", "Thư viện Trường", "Khoa Công nghệ Thông tin"]} {...form.getInputProps("donViTiepNhan")} />
                                <MyTextArea label="Mục đích bàn giao" {...form.getInputProps("mucDichBanGiao")} />
                            </Stack>
                            <Stack>
                                <MyDateInput label="Ngày bàn giao"  {...form.getInputProps("ngayBanGiao")} />
                                <MySelect label="Người bàn giao" data={["Nguyễn Thị K (CBQLKH01)", "Trần Thị H (CH.QLKH02)"]} {...form.getInputProps("nguoiBanGiao")} />
                                <MySelect label="Người tiếp nhận" data={["Lê Văn M (Đại diện NXB)", "Trần V H (Thủ thư)", "Phạm L M (Trưởng Khoa CNTT)"]} {...form.getInputProps("nguoiTiepNhan")} />
                                <MyFileInput label="File quyết định/văn bản ban hành" />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyFlexColumn>
                            <MyDataTable
                                data={memberData}
                                columns={memberColumns}
                                getRowId={(row) => row.id?.toString() ?? row.code.toString()}
                                enableRowSelection={true}
                                enableRowNumbers={false}
                            />
                        </MyFlexColumn>
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}
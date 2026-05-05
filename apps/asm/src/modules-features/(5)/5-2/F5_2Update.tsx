'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Flex, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DateInput } from "@mantine/dates"

import { useDisclosure } from '@mantine/hooks';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";

export interface I5_2Update {
    id?: number;
    ngayChungTu?: Date | undefined;
    soChungTu?: string;
    ngayPhanBo?: Date | undefined;
    ghiChu?: string;
}
export interface I5_2Update {
    id?: number
    code?: string
    name?: string
    maVach?: string
    donViSuDung?: string
    giaTriMuaMoi?: string
    giaTriDauKy?: string
    phanTramPhanBo?: string
    giaTriPhanBo?: string
    giaTriConLai?: string
}

export default function F5_2Update() {
    const disc = useDisclosure()
    const form = useForm<I5_2Update>({
        initialValues: {
            id: 1,
            ngayChungTu: new Date("2025-01-15"),
            soChungTu: "PBCT029",
            ngayPhanBo: new Date("2025-01-20"),
            ghiChu: "Phân bố chi phí công cụ dụng cụ 1/2025",
        }
    })

    const query = useQuery<I5_2Update[]>({
        queryKey: [`I5_2Update`],
        queryFn: async () => [
            {
                id: 1,
                code: "TV55SS",
                name: "Màn hình 25 inc",
                maVach: "TS02356",
                donViSuDung: "Phòng hành chính",
                giaTriMuaMoi: "5000000",
                giaTriDauKy: "4950000",
                phanTramPhanBo: "5",
                giaTriPhanBo: "50000",
                giaTriConLai: "4900000"
            }
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_2Update>[]>(() => [
        {
            header: "Mã tài sản",
            accessorKey: "code",
        },
        {
            header: "Tên tài sản",
            accessorKey: "name",
        },
        {
            header: "Mã vạch",
            accessorKey: "maVach",
        },
        {
            header: "Đơn vị sử dụng",
            accessorKey: "donViSuDung",
        },
        {
            header: "Giá trị mua mới",
            accessorKey: "giaTriMuaMoi",
        },
        {
            header: "Giá trị đầu kỳ",
            accessorKey: "giaTriDauKy",
        },
        {
            header: "% phân bổ",
            accessorKey: "phanTramPhanBo",
        },
        {
            header: "Giá trị phân bổ",
            accessorKey: "giaTriPhanBo",
        },
        {
            header: "Giá trị còn lại",
            accessorKey: "giaTriConLai",
        },
    ], []);

    return (
        <MyActionIconUpdate
            modalSize={'90%'}
            form={form}
            onSubmit={() => { }}>
            <Group>
                <DateInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Ngày chứng từ"
                    placeholder="Chọn ngày chứng từ"
                    {...form.getInputProps('ngayChungTu')}
                />
                <MyTextInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Số chứng từ"
                    {...form.getInputProps('soChungTu')}
                />
                <DateInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Ngày phân bổ"
                    placeholder="Chọn ngày phân bổ"
                    {...form.getInputProps('ngayPhanBo')}
                />
            </Group>
            <Textarea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                minRows={4}
            />
            <Group justify="flex-end">
                <Button color="indigo">Lưu và Tính</Button>
            </Group>
            {query.isLoading && "Đang tải dữ liệu..."}
            {query.isError && "Không có dữ liệu..."}
            <MyDataTable
                exportAble
                columns={columns}
                data={query.data!}
            />
        </MyActionIconUpdate>
    );

}
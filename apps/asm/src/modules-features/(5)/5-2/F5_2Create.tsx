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
import { I } from './F5_2Read';
import { useDisclosure } from '@mantine/hooks';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { IconPlus } from "@tabler/icons-react";

export interface IF5_2Create {
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

export default function F5_2Create() {
    const disc = useDisclosure()
    const form = useForm<IF5_2Create>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            maVach: "",
            donViSuDung: "",
            giaTriMuaMoi: "",
            giaTriDauKy: "",
            phanTramPhanBo: "",
            giaTriPhanBo: "",
            giaTriConLai: "",
        }
    })

    const query = useQuery<IF5_2Create[]>({
        queryKey: [`F5_2Create`],
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

    const columns = useMemo<MRT_ColumnDef<IF5_2Create>[]>(() => [

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

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyButtonModal
            title="Chi tiết phân bố giá trị công cụ dụng cụ"
            disclosure={disc} modalSize={'100%'}
            label="Thêm"
            color="blue"
            leftSection={<IconPlus />}
        >
            <Group>
                <DateInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Ngày chứng từ"
                    placeholder="Chọn ngày chứng từ"
                />
                <MyTextInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Số chứng từ" />
                <DateInput
                    w={{ base: '100%', md: '25%', lg: '15%' }}
                    label="Ngày phân bổ"
                    placeholder="Chọn ngày phân bổ"
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
            <MyDataTable
                exportAble
                columns={columns}
                data={query.data!}
            />
        </MyButtonModal>
    );

}
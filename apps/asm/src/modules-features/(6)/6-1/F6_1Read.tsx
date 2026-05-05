'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import F6_1Create from "./F6_1Create";
import F6_1Update from "./F6_1Update";
import F6_1Delete from "./F6_1Delete";


interface IPlan {
    id?: number;
    code?: string;
    date?: Date | undefined;
    name?: string;
    note?: string;
    type?: string;
    startDate?: Date | undefined
    endDate?: Date | undefined
    mail?: string;
    isMailSent?: boolean
    file?: File | null;
    receiver?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;

}

export default function F6_1Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IPlan[]>([]);
    const [checked, setChecked] = useState(false);

    const stockCheck = useQuery<IPlan[]>({
        queryKey: [`F6_1Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return plans
        },
    })

    useEffect(() => {
        if (stockCheck.data) {
            setTempData(stockCheck.data); // Sao chép dữ liệu từ query
        }
    }, [stockCheck.data]);

    const handleDeleteAllRows = () => {
        setTempData([]); // Xóa toàn bộ dữ liệu
    };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };


    const columns = useMemo<MRT_ColumnDef<IPlan>[]>(
        () => [
            {
                header: "Mã kế hoạch",
                accessorKey: "code",
            },
            {
                header: "Ngày kế hoạch",
                accessorFn: (row) =>
                    row.date ? U0DateToDDMMYYYString(new Date(row.date)) : "",
            },
            {
                header: "Tên kế hoạch",
                accessorKey: "name",
            },
            {
                header: "Loại kế hoạch",
                accessorKey: "type",
            },
            {
                header: "Ngày bắt đầu",
                accessorFn: (row) =>
                    row.startDate ? U0DateToDDMMYYYString(new Date(row.startDate)) : "",
            },
            {
                header: "Ngày kết thúc",
                accessorFn: (row) =>
                    row.endDate ? U0DateToDDMMYYYString(new Date(row.endDate)) : "",
            },
            {
                header: "File kế hoạch",
                accessorKey: "file",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Danh sách người nhận",
                accessorFn: (row) => {
                    return (
                        <Anchor>Xem</Anchor>
                    )
                }
            },
            {
                header: "Gửi mail",
                accessorFn: (row) => {
                    return (
                        <Button variant="light" color="indigo">Gửi mail</Button>
                    )
                },
                size: 140
            },
            {
                header: "Đã gửi mail",
                accessorKey: "isMailSent",
                accessorFn: (row) => {
                    return (
                        <Checkbox
                            checked={row.isMailSent}
                            onChange={(event) => setChecked(event.currentTarget.checked)}

                        />
                    )
                }
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",

                accessorFn: (row) =>
                    row.ngayCapNhat
                        ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat))
                        : "",
            },
        ],
        []
    );


    if (stockCheck.isLoading) return "Đang tải dữ liệu..."
    if (stockCheck.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={tempData}
            exportAble
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F6_1Create />
                            <Button leftSection={<IconTrash />} color="red">Xóa</Button>

                            <AQButtonCreateByImportFile
                                setImportedData={setFileData}
                                onSubmit={
                                    () => {
                                        console.log("data: ");
                                    }
                                }
                                form={form_multiple}
                            >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F6_1Update data={row.original} />
                        <F6_1Delete DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const plans: IPlan[] = [
    {
        id: 1,
        code: "BT001",
        date: new Date("2025-01-01"),
        name: "Bảo trì, bảo dưỡng trang thiết bị của nhà trường",
        note: "Lập kế hoạch sửa chữa tài sản trong trường đại học.",
        type: "Bảo trì",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-15"),
        mail: "maintenance@university.edu",
        isMailSent: true,
        file: null,
        receiver: "Phòng Kỹ Thuật",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    },
    {
        id: 2,
        code: "BT002",
        date: new Date("2025-02-15"),
        name: "Kế hoạch bảo trì hệ thống máy chiếu",
        note: "Bảo trì định kỳ hệ thống máy chiếu trong trường đại học.",
        type: "Bảo Trì",
        startDate: new Date("2025-02-20"),
        endDate: new Date("2025-02-25"),
        mail: "maintenance@university.edu",
        isMailSent: true,
        file: null,
        receiver: "Phòng Kỹ Thuật",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-02-16"),
    },
    {
        id: 3,
        code: "BT003",
        date: new Date("2025-03-01"),
        name: "Kế hoạch bảo trì hệ thống điện",
        note: "Bảo trì định kỳ hệ thống điện trong trường đại học.",
        type: "Bảo Trì",
        startDate: new Date("2025-03-05"),
        endDate: new Date("2025-03-10"),
        mail: "maintenance@university.edu",
        isMailSent: false,
        file: null,
        receiver: "Phòng Kỹ Thuật",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-03-02"),
    },
    {
        id: 4,
        code: "SC001",
        date: new Date("2025-04-10"),
        name: "Kế hoạch sửa chữa và nâng cấp văn phòng",
        note: "Sửa chữa và nâng cấp văn phòng làm việc khoa CNTT.",
        type: "Sửa chữa",
        startDate: new Date("2025-04-15"),
        endDate: new Date("2025-04-20"),
        mail: "office@university.edu",
        isMailSent: true,
        file: null,
        receiver: "Phòng Hành Chính",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-04-11"),
    },
    {
        id: 5,
        code: "NC001",
        date: new Date("2025-05-01"),
        name: "Kế hoạch nâng cấp máy chủ",
        note: "Nâng cấp hệ thống máy chủ của trường đại học.",
        type: "Nâng cấp",
        startDate: new Date("2025-05-10"),
        endDate: new Date("2025-05-15"),
        mail: "it-support@university.edu",
        isMailSent: true,
        file: null,
        receiver: "Phòng IT",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-05-02"),
    },
];


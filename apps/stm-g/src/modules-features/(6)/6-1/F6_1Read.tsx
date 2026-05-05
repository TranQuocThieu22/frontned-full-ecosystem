'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Badge, Group, NumberFormatter } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertOctagon, IconAlertSquareRounded, IconBan, IconChecks, IconCircleX, IconClock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F6_1Create from "./F6_1Create";
import F6_1Update from "./F6_1Update";

interface ICourseDiscount {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    discountId: number;
    courseId: number;
}

interface IBranchDiscount {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    discountId: number;
    branchId: number;
}

interface IDiscount {
    id: number;
    code: string;
    mode?: number;
    note?: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    discountType: number;
    price: number;
    percent: number;
    maxCount: number;
    status: number;
    startDate: string; // Or Date if you're parsing the string to Date
    endDate: string; // Or Date if you're parsing the string to Date
    isCancel: boolean;
    isAllCourse: boolean;
    isAllBranch: boolean;
    courseDiscounts: ICourseDiscount[];
    branchDiscounts: IBranchDiscount[];
}

export default function F6_1Read() {
    const [checked, setChecked] = useState(false);
    const [importData, setImportData] = useState(false);
    const DISCOUNT_TYPE = 1;
    const ChietKhauQuery = useQuery<IDiscount[]>({
        queryKey: [`F6_1Read`],
        queryFn: async () => {
            const response = await baseAxios.get(`/Discount/GetDetail?type=${DISCOUNT_TYPE}`);
            const result = response.data.data
            return result
        },
    })
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        ngay: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                "fieldName": "maChuongTrinh",
                "header": "Mã chương trình"
            },
            {
                "fieldName": "soTienGiam",
                "header": "Số tiền giảm"
            },
            {
                "fieldName": "phanTramGiam",
                "header": "Phần trăm giảm"
            },
            {
                "fieldName": "daSuDung",
                "header": "Đã sử dụng"
            },
            {
                "fieldName": "trangThai",
                "header": "Trạng thái",
            },
            {
                "fieldName": "mode",
                "header": "Loại chiết khấu"
            },
            {
                "fieldName": "ngayBatDau",
                "header": "Ngày bắt đầu",
                formatFunction: formatFunctions.ngay
            },
            {
                "fieldName": "ngayKetThuc",
                "header": "Ngày kết thúc",
                formatFunction: formatFunctions.ngay
            },
            {
                "fieldName": "khoaHoc",
                "header": "Khóa học"
            },
            {
                "fieldName": "chiNhanh",
                "header": "Chi nhánh"
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<IDiscount>[]>(
        () => [
            {
                header: "Mã giảm giá",
                accessorKey: "code"
            },
            {
                header: "Số tiền giảm",
                accessorKey: "price",
                accessorFn(originalRow) {

                    // return <Badge color={trangThai.color} radius="xs"><Text size="sm">{trangThai.text}</Text></Badge>
                    return <NumberFormatter suffix=" VND" value={originalRow.price} thousandSeparator />;
                },
            },
            {
                header: "Phần trăm giảm",
                accessorKey: "percent",
                accessorFn(originalRow) {

                    // return <Badge color={trangThai.color} radius="xs"><Text size="sm">{trangThai.text}</Text></Badge>
                    return <NumberFormatter suffix=" %" value={originalRow.percent} />;
                },
            },
            {
                header: "Đã sử dụng",
                accessorKey: "daSuDung",
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                accessorFn(originalRow) {
                    if (originalRow.status) {

                        return <DisplayDiscountStatus DiscountStatus={originalRow.status} />
                        // return <Box bg={trangThai.color} p={5}><Text c={trangThai.textColor}>{trangThai.text}</Text></Box>
                    }
                },


            },
            // {
            //     header: "Loại chiết khấu",
            //     accessorKey: "loaiTrietKhau",
            //     accessorFn(originalRow) {
            //         let loaiMa = GetLoaiMa(originalRow.loaiTrietKhau!)

            //         // return <Badge color={trangThai.color} radius="xs"><Text size="sm">{trangThai.text}</Text></Badge>
            //         return loaiMa.text
            //     },
            // },
            {
                header: "Ngày bắt đầu",
                accessorKey: "startDate",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.startDate!))
                },
            },
            {
                header: "Ngày kết thúc",
                accessorKey: "endDate",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.endDate!))
                },
            },
            {
                header: "Khóa học",
                accessorKey: "khoaHoc",
                accessorFn(originalRow) {
                    return originalRow.courseDiscounts
                        ?.map((item) => item.name)
                        .join(", ") || "";
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.courseDiscounts
                                    ?.map((item) => item.name)
                                    .join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Chi nhánh",
                accessorKey: "chiNhanh",
                accessorFn(originalRow) {
                    return originalRow.branchDiscounts
                        ?.map((item) => item.name)
                        .join(", ") || "";
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.branchDiscounts
                                    ?.map((item) => item.name)
                                    .join("\n")}
                            </div>
                        </>
                    )
                },
            },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
        ]
        ,
        []
    );

    if (ChietKhauQuery.isLoading) return "Đang tải dữ liệu..."
    if (ChietKhauQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            exportAble
            data={ChietKhauQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F6_1Create />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F6_1Update data={row.original} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

export function DisplayDiscountStatus({ DiscountStatus }: { DiscountStatus: number }) {
    switch (DiscountStatus) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="gray" radius="xs">
                        Chưa đến hạn
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconChecks />}
                        variant="light" color="#32cd32" radius="xs">
                        Đang áp dụng
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconBan />}
                        variant="light" color="red" radius="xs">
                        Hết hạn
                    </Badge>
                </>
            );
        case 4:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconAlertSquareRounded />}
                        variant="light" color="#ffa500" radius="xs">
                        Đã sử dụng đủ
                    </Badge>
                </>
            );
        case 5:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCircleX />}
                        variant="light" color="#808080" radius="xs">
                        Bị hủy
                    </Badge>
                </>
            );

        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconAlertOctagon />}
                        variant="light" color="gray" radius="xs">
                        Chưa có trạng thái
                    </Badge>
                </>
            );
    }
}

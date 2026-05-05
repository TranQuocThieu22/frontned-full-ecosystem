'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group, NumberFormatter } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DisplayDiscountStatus } from "../6-1/F6_1Read";
import F6_2Create from "./F6_2Create";
import F6_2Update from "./F6_2Update";




export default function F6_2Read() {
    const [checked, setChecked] = useState(false);
    const [importData, setImportData] = useState(false);
    const DISCOUNT_TYPE = 2;

    const maGiamGia = useQuery<IDiscount[]>({
        queryKey: [`F6_2Read`],
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
                "fieldName": "code",
                "header": "Mã giảm giá"
            },
            {
                "fieldName": "price",
                "header": "Số tiền giảm"
            },
            {
                "fieldName": "percent",
                "header": "Phần trăm giảm"
            },
            {
                "fieldName": "daSuDung",
                "header": "Đã sử dụng"
            },
            // {
            //     "fieldName": "trangThai",
            //     "header": "Trạng thái",
            // },
            {
                "fieldName": "discountType",
                "header": "Loại mã giảm giá"
            },
            {
                "fieldName": "startDate",
                "header": "Ngày bắt đầu",
                formatFunction: formatFunctions.ngay
            },
            {
                "fieldName": "endDate",
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
                    let trangThai = GetTrangThai(originalRow.status!)

                    return <DisplayDiscountStatus DiscountStatus={originalRow.status} />

                },
            },
            {
                header: "Loại mã giảm giá",
                accessorKey: "discountType",
                accessorFn(originalRow) {
                    console.log("discountType:", originalRow.mode);
                    let mode = GetLoaiMa(originalRow.mode!)

                    // return <Badge color={trangThai.color} radius="xs"><Text size="sm">{trangThai.text}</Text></Badge>
                    return mode?.text
                },
            },
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

    if (maGiamGia.isLoading) return "Đang tải dữ liệu..."
    if (maGiamGia.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            initialState={{
                density: "md",
                pagination: { pageIndex: 0, pageSize: 30 },
                columnPinning: { right: ["mrt-row-actions"] },
                columnVisibility: {
                    nguoiCapNhat: false,
                    ngayCapNhat: false
                }
            }}
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={maGiamGia.data || []}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F6_2Create />
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
                        {/* //FIXME: tạm comment chờ api */}
                        <F6_2Update data={row.original} />
                        {/* <F6_2Delete lecturerAndExpertId={row.original.id!} /> */}
                    </MyCenterFull>
                )
            }}
        />
    )
}
function GetTrangThai(trangThai: number) {
    // Validate input is between 1 and 5
    // if (trangThai < 1 || trangThai > 5) {
    //     throw new Error('Input must be a number between 1 and 5');
    // }

    const trangThaiMap: { [key: number]: { text: string, color: string, textColor: string } } = {
        0: {
            text: "Giá trị = 0",
            color: "#D3D3D3",
            textColor: "#000000"
        },
        1: {
            text: "🕒 Chưa đến hạn",
            color: "#D3D3D3",
            textColor: "#000000"
        },
        2: {
            text: "✅ Đang áp dụng",
            color: "#32CD32",
            textColor: "#FFFFFF"

        },
        3: {
            text: "❌ Hết hạn",
            color: "#FF6347",
            textColor: "#FFFFFF"

        },
        4: {
            text: "⚠️ Đã sử dụng đủ",
            color: "#FFA07A",
            textColor: "#000000"

        },
        5: {
            text: "🛑 Bị hủy",
            color: "#FF0000",
            textColor: "#FFFFFF"

        }
    };


    return trangThaiMap[trangThai];
}

function GetLoaiMa(loaiMa: number) {
    // Validate input is between 1 and 5
    if (loaiMa < 1 || loaiMa > 5) {
        throw new Error('Input must be a number between 1 and 5');
    }

    const loaiMaMap: { [key: number]: { text: string, color: string, textColor: string } } = {
        1: {
            text: "Giới thiệu",
            color: "#D3D3D3",
            textColor: "#000000"
        },
        2: {
            text: "Nhân viên",
            color: "#32CD32",
            textColor: "#FFFFFF"

        },
        3: {
            text: "Quản lý",
            color: "#FF6347",
            textColor: "#FFFFFF"

        },
        4: {
            text: "Voucher",
            color: "#FFA07A",
            textColor: "#000000"

        },
        5: {
            text: "Khác",
            color: "#FF0000",
            textColor: "#FFFFFF"

        }
    };


    return loaiMaMap[loaiMa];
}

let mockData = [
    {
        "id": 1,
        "code": "SALE2023",
        "price": "50000",
        "percent": "10",
        "daSuDung": "0/50",
        "trangThai": 1,
        "discountType": 1,
        "startDate": new Date("1988-05-05"),
        "endDate": new Date("1988-05-05"),
        "khoaHoc": 101,
        "chiNhanh": 3,
        "nguoiCapNhat": "admin",
        "ngayCapNhat": new Date("2024-12-19")
    },
    {
        "id": 2,
        "code": "NEWUSER",
        "price": "100000",
        "percent": "15",
        "daSuDung": "20/30",
        "trangThai": 2,
        "discountType": 5,
        "startDate": new Date("1988-05-05"),
        "endDate": new Date("1988-05-05"),
        "khoaHoc": 102,
        "chiNhanh": 1,
        "nguoiCapNhat": "admin",
        "ngayCapNhat": new Date("2024-12-19")
    },
    {
        "id": 3,
        "code": "FESTIVE50",
        "price": "0",
        "percent": "50",
        "daSuDung": "30/30",
        "trangThai": 3,
        "discountType": 2,
        "startDate": new Date("1988-05-05"),
        "endDate": new Date("1988-05-05"),
        "khoaHoc": 103,
        "chiNhanh": 2,
        "nguoiCapNhat": "admin",
        "ngayCapNhat": new Date("2024-12-19")
    },
    {
        "id": 4,
        "code": "NEWYEAR2025",
        "price": "0",
        "percent": "50",
        "daSuDung": "30/30",
        "trangThai": 4,
        "discountType": 3,
        "startDate": new Date("1988-05-05"),
        "endDate": new Date("1988-05-05"),
        "khoaHoc": 103,
        "chiNhanh": 2,
        "nguoiCapNhat": "admin",
        "ngayCapNhat": new Date("2024-12-19")
    },
    {
        "id": 5,
        "code": "HAPPYAQ",
        "price": "0",
        "percent": "50",
        "daSuDung": "30/30",
        "trangThai": 5,
        "discountType": 4,
        "startDate": new Date("1988-05-05"),
        "endDate": new Date("1988-05-05"),
        "khoaHoc": 103,
        "chiNhanh": 2,
        "nguoiCapNhat": "admin",
        "ngayCapNhat": new Date("2024-12-19")
    }
]


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
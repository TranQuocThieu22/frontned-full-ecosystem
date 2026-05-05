'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F11_1Create from "./F11_1Create";
import F11_1Delete from "./F11_1Delete";
import F11_1QualifiedStudents from "./F11_1QualifiedStudents";
import F11_1Update from "./F11_1Update";

interface IExam {
    id?: number;
    code?: string;
    name?: string;
}
interface ICertificate {
    id?: number;
    code?: string;
    name?: string;
}

interface ICertificateReviewBatch {
    id?: number;
    code?: string;
    name?: string;
    certificate?: ICertificate;
    certificateId?: number;
    exams?: IExam[];
}




export default function F11_1Read() {
    const [checked, setChecked] = useState(false);
    const [importData, setImportData] = useState(false);

    const F11_1Read = useQuery<ICertificateReviewBatch[]>({
        queryKey: [`F11_1Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            const response = await baseAxios.get("/CertificateReviewBatch/getall?cols=Certificate,exams")
            return response.data.data
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
                fieldName: "code", // Replaced with the corresponding field from ITaoChungChi
                header: "Mã đợt xét cấp chứng chỉ" // Updated header to reflect the meaning
            },
            {
                fieldName: "name", // Represents a descriptive title for the examination period
                header: "Tên đợt xét cấp chứng chỉ"
            },
            {
                fieldName: "danhSachKhoaThi", // This can represent a count of how many passed (similar to "daSuDung")
                header: "Danh sách khóa thi" // Updated header for clarity
            },
            {
                fieldName: "chungChi", // This represents the type of certificate
                header: "Loại chứng chỉ" // Updated header for clarity
            },

            {
                fieldName: "danhSachDat", // Represents the list of courses
                header: "Danh sách đạt"
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICertificateReviewBatch>[]>(
        () => [
            {
                header: "Mã đợt xét cấp chứng chỉ", // Updated header to match the meaning
                accessorKey: "code"
            },
            {
                header: "Tên đợt xét cấp chứng chỉ", // Updated header for clarity
                accessorKey: "name"
            },
            {
                header: "Danh sách khóa thi", // Updated header for clarity
                accessorKey: "danhSachKhoaThi",

                accessorFn(originalRow) {
                    return originalRow.exams?.map((exam) => exam.name).join(", ");
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.exams?.map((exam) => exam.name).join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Chứng chỉ", // Updated header for clarity
                accessorKey: "certificate.name",
                // accessorFn(originalRow) {
                //     return originalRow.chungChi; // Returns the type of certificate
                // },
            },

            {
                header: "Danh sách đạt",
                accessorKey: "danhSachDat",
                accessorFn(originalRow) {
                    return (
                        <F11_1QualifiedStudents
                            label="xem"
                            color="indigo"
                            values={{ examIds: originalRow.exams?.map(exam => exam.id) || [] }}
                        />
                    )
                },
            },
            //{
            //    header: "Ngày cập nhật",
            //    accessorKey: "ngayCapNhat",
            //    accessorFn(originalRow) {
            //        return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //    },

            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",

            // },
        ]
        ,
        []
    );

    if (F11_1Read.isLoading) return "Đang tải dữ liệu..."
    if (F11_1Read.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable

            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={F11_1Read.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F11_1Create />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>

                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsGiangVienVaChuyenGia"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />
                            <Button>Xét chứng chỉ</Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F11_1Update data={row.original} />
                        <F11_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

function GetTrangThai(trangThai: number) {
    // Validate input is between 1 and 5
    if (trangThai < 1 || trangThai > 5) {
        throw new Error('Input must be a number between 1 and 5');
    }

    const trangThaiMap: { [key: number]: { text: string, color: string, textColor: string } } = {
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

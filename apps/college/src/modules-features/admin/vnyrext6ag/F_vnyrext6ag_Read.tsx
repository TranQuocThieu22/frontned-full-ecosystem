'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vnyrext6ag_Create from "./F_vnyrext6ag_Create";
import F_vnyrext6ag_Delete from "./F_vnyrext6ag_Delete";
import F_vnyrext6ag_ExamSelect from "./F_vnyrext6ag_ExamSelect";
import F_vnyrext6ag_Update from "./F_vnyrext6ag_Update";


// Interface định nghĩa dữ liệu
export interface I_vnyrext6ag {
    id?: number;
    maMonHoc?: string;
    tenMonHoc?: string;
    maHinhThucThi?: string;
    tenHinhThucThi?: string;
    soTietThi?: string;
    tinhChatPhong?: string;
}

// Component hiển thị bảng dữ liệu
export default function F_vnyrext6ag_Read() {

    const examDetailData = useQuery<I_vnyrext6ag[]>({
        queryKey: ["TCThitData"],
        queryFn: async () => [
            {
                id: 1,
                maMonHoc: "MH001",
                tenMonHoc: "Toán cao cấp",
                maHinhThucThi: "HT001",
                tenHinhThucThi: "Thi viết",
                soTietThi: "10",
                tinhChatPhong: "Phòng tiêu chuẩn",
            },
            {
                id: 2,
                maMonHoc: "MH002",
                tenMonHoc: "Lập trình C++",
                maHinhThucThi: "HT002",
                tenHinhThucThi: "Thi thực hành",
                soTietThi: "15",
                tinhChatPhong: "Phòng máy tính",
            },
            {
                id: 3,
                maMonHoc: "MH003",
                tenMonHoc: "Xác suất thống kê",
                maHinhThucThi: "HT001",
                tenHinhThucThi: "Thi viết",
                soTietThi: "12",
                tinhChatPhong: "Phòng tiêu chuẩn",
            },

        ],
    });

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_vnyrext6ag>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "maMonHoc",
            },
            {
                header: "Tên môn học",
                accessorKey: "tenMonHoc",
            },
            {
                header: "Mã hình thức thi",
                accessorKey: "maHinhThucThi",
            },
            {
                header: "Tên hình thức thi",
                accessorKey: "tenHinhThucThi",
            },
            {
                header: "Số tiết thi",
                accessorKey: "soTietThi",
            },
            {
                header: "Tính chất phòng",
                accessorKey: "tinhChatPhong",
            },
        ],
        []
    );
    const exportConfig = {
        fields: [
            {
                fieldName: "studentId",
                header: "Mã sinh viên"
            },
            {
                fieldName: "classname",
                header: "Họ lót"
            },
            {
                fieldName: "name",
                header: "Tên"
            },
            {
                fieldName: "certificate",
                header: "Mã chứng chỉ"
            },
            {
                fieldName: "certificatename",
                header: "Tên chứng chỉ"
            },
            {
                fieldName: "diplomaNumber",
                header: "Số văn bằng"
            },
            {
                fieldName: "issueDate",
                header: "Ngày cấp"
            },
            {
                fieldName: "expiryDate",
                header: "Ngày hết hạn"
            },
            {
                fieldName: "submissionDate",
                header: "Ngày nộp"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            }
        ]
    };

    // Xử lý trạng thái tải dữ liệu
    if (examDetailData.isLoading) return "Đang tải dữ liệu...";
    if (examDetailData.isError) return "Không có dữ liệu...";


    return (
        <MyFieldset title={"Danh sách tính chất thi môn học"}>
            <MyDataTable
                enableRowSelection={true}
                columns={columns} // Các cột hiển thị
                data={examDetailData.data!}
                renderTopToolbarCustomActions={() => (
                    <>
                        <F_vnyrext6ag_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={
                                () => {
                                    console.log("data: ");
                                }
                            }
                            form={form_multiple}
                        ></AQButtonCreateByImportFile>
                        <Button color="teal">Export</Button>
                        <Button color="red">Xoá</Button>
                        <F_vnyrext6ag_ExamSelect />

                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_vnyrext6ag_Update data={row.original} />
                            <F_vnyrext6ag_Delete id={0} maMonHoc={row.original.maMonHoc || ""} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>

    );
}
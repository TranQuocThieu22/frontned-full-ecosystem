'use client';
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import F_dud5jq8o3g_Delete from "./F_dud5jq8o3g_Delete";
import F_dud5jq8o3g_Create from "./F_dud5jq8o3g_Create";
import F_dud5jq8o3g_Update from "./F_dud5jq8o3g_Update";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";

export interface I_dud5jq8o3g {
    id?: number;
    maTuyenXe?: string;
    tenTuyenXe?: string;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    gioiTinh?: string;
    ngaySinh?: Date;
    diemDonTra?: string;
    ngayDangKy?: Date;
    loaiDangKy?: string;
    ngayDonTra?: string;
    soNgay?: number;
    taiTuc?: boolean;
}

export default function F_dud5jq8o3g_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const queryStudentTransport = useQuery<I_dud5jq8o3g[]>({
        queryKey: ["F_dud5jq8o3g_Read"],
        queryFn: async () => [
            {
                id: 1,
                maTuyenXe: "TX001",
                tenTuyenXe: "Tuyến số 1",
                maHocSinh: "HS001",
                hoTen: "Nguyễn Văn A",
                lop: "10A1",
                gioiTinh: "Nam",
                ngaySinh: new Date(),
                diemDonTra: "Cổng chính",
                ngayDangKy: new Date(),
                loaiDangKy: "Tháng",
                ngayDonTra: "30/01/2025-02/03/2025",
                soNgay: 20,
                taiTuc: true
            },
            {
                id: 2,
                maTuyenXe: "TX002",
                tenTuyenXe: "Tuyến số 2",
                maHocSinh: "HS002",
                hoTen: "Trần Thị B",
                lop: "10A2",
                gioiTinh: "Nữ",
                ngaySinh: new Date(),
                diemDonTra: "Cổng sau",
                ngayDangKy: new Date(),
                loaiDangKy: "Ngày",
                ngayDonTra: "30/01/2025-02/03/2025",
                soNgay: 10,
                taiTuc: false
            },
            {
                id: 3,
                maTuyenXe: "TX003",
                tenTuyenXe: "Tuyến số 3",
                maHocSinh: "HS003",
                hoTen: "Lê Văn C",
                lop: "10A3",
                gioiTinh: "Nam",
                ngaySinh: new Date(),
                diemDonTra: "Cổng chính",
                ngayDangKy: new Date(),
                loaiDangKy: "Tuần",
                ngayDonTra: "30/01/2025-02/03/2025",
                soNgay: 5,
                taiTuc: true
            }
        ]
    });

    const exportConfig = {
        fields: [
            { fieldName: "maTuyenXe", header: "Mã tuyến xe" },
            { fieldName: "tenTuyenXe", header: "Tên tuyến xe" },
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "lop", header: "Lớp" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "diemDonTra", header: "Điểm đón/trả" },
            { fieldName: "ngayDangKy", header: "Ngày đăng ký" },
            { fieldName: "loaiDangKy", header: "Loại đăng ký" },
            { fieldName: "ngayDonTra", header: "Ngày đón/trả" },
            { fieldName: "soNgay", header: "Số ngày" },
            {
                fieldName: "taiTuc",
                header: "Tái tục",
                format: (value: boolean) => (value ? "Có" : "Không")
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_dud5jq8o3g>[]>(() => [
        { header: "Mã tuyến xe", accessorKey: "maTuyenXe" },
        { header: "Tên tuyến xe", accessorKey: "tenTuyenXe" },
        { header: "Mã học sinh", accessorKey: "maHocSinh" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Lớp", accessorKey: "lop" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        {
            header: "Ngày sinh", accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.ngaySinh!)),

        },
        { header: "Điểm đón/trả", accessorKey: "diemDonTra" },
        {
            header: "Ngày đăng ký", accessorFn: row => {
                const date = new Date(row.ngayDangKy!);
                return `${utils_date_dateToDDMMYYYString(date)} ${date.toLocaleTimeString("vi")}`;
            }
        },
        { header: "Loại đăng ký", accessorKey: "loaiDangKy" },
        { header: "Ngày đón trả", accessorKey: "ngayDonTra", size: 240 },
        { header: "Số ngày", accessorKey: "soNgay" },
        {
            header: "Tái tục",
            accessorKey: "taiTuc",
            Cell: ({ cell }) => <Checkbox readOnly checked={cell.getValue<boolean>()} />
        }
    ], []);

    if (queryStudentTransport.isLoading) return "Đang tải dữ liệu...";
    if (queryStudentTransport.isError) return "Không có dữ liệu";

    return (
        <MyFieldset title="Danh sách đăng ký tuyến xe">
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={queryStudentTransport.data!}
                renderTopToolbarCustomActions={() => (
                    <>
                        <F_dud5jq8o3g_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => console.log("data: ")}
                            form={form_multiple}
                        />
                        <AQButtonExportData
                            objectName="dsTuyenXe"
                            data={queryStudentTransport.data!}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                    </>
                )}
                renderRowActions={({ row }) => <>
                    <MyCenterFull>
                        <F_dud5jq8o3g_Update data={row.original} />
                        <F_dud5jq8o3g_Delete id={0} contextData={row.original.maTuyenXe!} />
                    </MyCenterFull>
                </>}
            />
        </MyFieldset>
    );
}

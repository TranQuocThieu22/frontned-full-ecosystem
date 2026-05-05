'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import F_82fp2peexf_Create from "./F_82fp2peexf_Create";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import F_82fp2peexf_Update from "./F_82fp2peexf_Update";

export interface I_82fp2peexf {
    id?: number;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    gioiTinh?: string;
    ngaySinh?: Date;
    doiTuongKhieuNai?: string;
    nguoiGui?: string;
    loaiKhieuNai?: string;
    noiDungKhieuNai?: string;
    ngayGui?: Date;
    trangThaiPhanHoi?: string;
    noiDungPhanHoi?: string;
    fileDinhKem?: string;
    danhGiaMucDoHaiLong?: string;  // string thay vì number
    noiDungDanhGia?: string;       // string thay vì boolean
}

export default function F_82fp2peexf_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({ initialValues: { importedData: [] } });

    const queryComplaints = useQuery<I_82fp2peexf[]>({
        queryKey: ["F_82fp2peexf_Read"],
        queryFn: async () => [
            {
                id: 1,
                maHocSinh: "HS001",
                hoTen: "Nguyễn Văn A",
                lop: "10A1",
                gioiTinh: "nam",
                ngaySinh: new Date(),
                doiTuongKhieuNai: "Phụ huynh",
                nguoiGui: "Phụ huynh A",
                loaiKhieuNai: "Vệ sinh",
                noiDungKhieuNai: "Giáo viên la mắng học sinh",
                ngayGui: new Date(),
                trangThaiPhanHoi: "Chưa xử lý",
                noiDungPhanHoi: "Đã trao đổi với giáo viên",
                fileDinhKem: "khieunai1.pdf",
                danhGiaMucDoHaiLong: "Hài lòng",
                noiDungDanhGia: "Rõ ràng, hợp lý",
            },
            {
                id: 2,
                maHocSinh: "HS002",
                hoTen: "Trần Thị B",
                lop: "10A2",
                gioiTinh: "nam",
                ngaySinh: new Date(),
                doiTuongKhieuNai: "Học sinh",
                nguoiGui: "Phụ huynh B",
                loaiKhieuNai: "Phục vụ",
                noiDungKhieuNai: "Thức ăn không đảm bảo",
                ngayGui: new Date(),
                trangThaiPhanHoi: "Đã xử lý",
                noiDungPhanHoi: "Đã trao đổi",
                fileDinhKem: "khieunai2.pdf",
                danhGiaMucDoHaiLong: "Không hài lòng",
                noiDungDanhGia: "Phản hồi chưa rõ",
            },
            {
                id: 3,
                maHocSinh: "HS003",
                hoTen: "Lê Văn C",
                lop: "10A3",
                gioiTinh: "nam",
                ngaySinh: new Date(),
                doiTuongKhieuNai: "Học sinh",
                nguoiGui: "Phụ huynh C",
                loaiKhieuNai: "Phục vụ",
                noiDungKhieuNai: "Thức ăn không đảm bảo",
                ngayGui: new Date(),
                trangThaiPhanHoi: "Đã xử lý",
                noiDungPhanHoi: "Chưa trao đổi",
                fileDinhKem: "khieunai3.pdf",
                danhGiaMucDoHaiLong: "Bình thường",
                noiDungDanhGia: "Phản hồi chưa rõ",
            }
        ]
    });

    const exportConfig = {
        fields: [
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "lop", header: "Lớp" },
            { fieldName: "gioiTinh", header: "gioiTinh" },
            { fieldName: "doiTuongKhieuNai", header: "Đối tượng khiếu nại" },
            { fieldName: "nguoiGui", header: "Người gửi" },
            { fieldName: "loaiKhieuNai", header: "Loại khiếu nại" },
            { fieldName: "noiDungKhieuNai", header: "Nội dung khiếu nại" },
            { fieldName: "ngayGui", header: "Ngày gửi" },
            { fieldName: "trangThaiPhanHoi", header: "Trạng thái phản hồi" },
            { fieldName: "noiDungPhanHoi", header: "Nội dung phản hồi" },
            { fieldName: "fileDinhKem", header: "File đính kèm" },
            { fieldName: "danhGiaMucDoHaiLong", header: "Mức độ hài lòng" },
            { fieldName: "noiDungDanhGia", header: "Nội dung đánh giá" },
        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_82fp2peexf>[]>(() => [
        { header: "Mã học sinh", accessorKey: "maHocSinh" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Lớp", accessorKey: "lop" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Ngày sinh", accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.ngaySinh!)) },
        { header: "Đối tượng khiếu nại", accessorKey: "doiTuongKhieuNai", size: 250 },
        { header: "Người gửi", accessorKey: "nguoiGui" },
        { header: "Loại khiếu nại", accessorKey: "loaiKhieuNai" },
        { header: "Nội dung khiếu nại", accessorKey: "noiDungKhieuNai", size: 250 },
        {
            header: "Ngày gửi",
            accessorFn: row => {
                const newDate = new Date(row.ngayGui!)
                return `${utils_date_dateToDDMMYYYString(newDate)} ${newDate.toLocaleTimeString("vi")}`;
            },
            id: "ngayGui",
        },
        { header: "Trạng thái phản hồi", accessorKey: "trangThaiPhanHoi", size: 230 },
        { header: "Nội dung phản hồi", accessorKey: "noiDungPhanHoi", size: 250 },
        {
            header: "File đính kèm", accessorKey: "fileDinhKem",
            Cell: ({ row }) => {
                const fileId = row.original.id;
                return <MyButtonViewPDF label={"Xem file"} id={fileId} />;
            }
        },
        { header: "Đánh giá mức độ hài lòng", accessorKey: "danhGiaMucDoHaiLong", size: 250 },
        { header: "Nội dung đánh giá", accessorKey: "noiDungDanhGia", size: 230 },
    ], []);

    if (queryComplaints.isLoading) return "Đang tải dữ liệu...";
    if (queryComplaints.isError) return "Không có dữ liệu";

    return (
        <MyFieldset title="Danh sách khiếu nại dịch vụ">
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={queryComplaints.data!}
                renderTopToolbarCustomActions={() => (
                    <>
                        <F_82fp2peexf_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => console.log("data: ", fileData)}
                            form={form_multiple}
                        />
                        <AQButtonExportData
                            isAllData
                            objectName="dsKhieuNai"
                            data={queryComplaints.data!}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                    </>
                )}
                renderRowActions={({ row }) => <>
                    <MyCenterFull>
                        <F_82fp2peexf_Update data={row.original} />
                    </MyCenterFull>
                </>}
            />
        </MyFieldset>
    );
}
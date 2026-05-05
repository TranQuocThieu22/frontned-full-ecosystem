import { MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IThanhLapHoiDongTuVanTuyenChonInfoViewModal } from "./interfaces/IThanhLapHoiDongTuVanTuyenChonInfoViewModal";
import ThanhLapHoiDongTuVanTuyenChonDeleteList from "./ThanhLapHoiDongTuVanTuyenChonDeleteList";
import ThanhLapHoiDongTuVanTuyenChonUpdate from "./ThanhLapHoiDongTuVanTuyenChonUpdate/ThanhLapHoiDongTuVanTuyenChonUpdateButton";
import ThanhLapHoiDongTuVanTuyenChonUpdateCreate from "./ThanhLapHoiDongTuVanTuyenChonCreate/ThanhLapHoiDongTuVanTuyenChonUpdateCreate";


export default function ThanhLapHoiDongTuVanTuyenChonTable() {
    const columns = useMemo<MRT_ColumnDef<IThanhLapHoiDongTuVanTuyenChonInfoViewModal>[]>(() => [
        { header: "Mã Hội đồng", accessorKey: "code" },
        { header: "Tên Hội đồng", accessorKey: "tenHoiDong" },
        {
            header: "Ngày họp", accessorKey: "ngayHop",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayHop),
        },
        { header: "Thời gian họp", accessorKey: "thoiGianHop" },
        { header: "Địa điểm họp", accessorKey: "diaDiemHop" },
        { header: "Chủ tịch Hội đồng", accessorKey: "chuTichHoiDong" },
        { header: "Thư ký Hội đồng", accessorKey: "thuKyHoiDong" },
        { header: "Danh sách thành viên", accessorKey: "danhSachThanhVien", size: 250, },
        {
            header: "Các đăng ký tuyển chọn được xét duyệt", accessorKey: "dangKyXetDuyet",
            size: 300,
        },
        { header: "Trạng thái Hội đồng", accessorKey: "trangThaiHoiDong" },
        {
            header: "File quyết định thành lập hội đồng tư vấn",
            accessorKey: "fileQuyetDinh",
            size: 250,
            Cell: ({ row }) => (
                <MyCenterFull>
                    <MyButtonViewPDF filePath={row.original.filePath} />
                </MyCenterFull>
            )
        },
    ], []);

    return (
        <MyFieldset title={"Danh sách hội đồng xét duyệt"}>
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <ThanhLapHoiDongTuVanTuyenChonUpdateCreate />
                        <MyButton crudType="import" />
                        <MyButton crudType="export" />
                        <ThanhLapHoiDongTuVanTuyenChonDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ThanhLapHoiDongTuVanTuyenChonUpdate data={row.original} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>
    )
}

const mockData: IThanhLapHoiDongTuVanTuyenChonInfoViewModal[] = [
    {
        id: 1,
        code: "HĐTC2025001",
        tenHoiDong: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 1/2025",
        ngayHop: new Date("2025-08-25"),
        thoiGianHop: "9:00 - 11:30",
        diaDiemHop: "Phòng họp A201",
        chuTichHoiDong: "GS.TS. Lê Văn Khai",
        thuKyHoiDong: "TS. Trần Thị Mai",
        danhSachThanhVien: "VC001, VC005, VC010, VC012",
        dangKyXetDuyet: "DX2025001, DX2025004, DX2025007",
        trangThaiHoiDong: "Đã thành lập",
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "quyetDinhThanhLap.pdf",
        },
    },
    {
        id: 2,
        code: "HĐTC2025002",
        tenHoiDong: "Hội đồng TV tuyển chọn nhiệm vụ KH&CN cấp cơ sở lần 2/2025",
        ngayHop: new Date("2025-09-10"),
        thoiGianHop: "14:00 - 17:00",
        diaDiemHop: "Phòng họp trực tuyến Zoom",
        chuTichHoiDong: "PGS.TS Nguyễn Văn A",
        thuKyHoiDong: "ThS. Lê Hoàng An",
        danhSachThanhVien: "VC002, VC003, VC006, VC008",
        dangKyXetDuyet: "DX2025002, DX2025005, DX2025008",
        trangThaiHoiDong: "Chờ họp",
        filePath: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        fileDetail: {
            fileName: "quyetDinhThanhLap.pdf",
        },
    },
];

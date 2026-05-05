'use client'
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyDataTable } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { AttendanceStatus } from "./AttendanceStatus";
import { StudentStatusBadge } from "./StudentStatusBadge";

export interface StudentRecord {
    maHocSinh: string;
    hoTen: string;
    sdtPhuHuynh: string;
    trangThaiHS: number;
    ghiChuChung: string;
    trangThaiDiemDanh: number;
    diemGocBTVN?: number;
    diemSuaBTVN?: string | number;
    nhanXet?: string;
    thuongTicker?: number;
}


export default function ViewPointButton() {
    const dics = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<StudentRecord>[]>(
        () => [
            {
                accessorKey: 'maHocSinh',
                header: 'Mã học sinh',
            },
            {
                accessorKey: 'hoTen',
                header: 'Họ và tên HS',
            },
            {
                accessorKey: 'sdtPhuHuynh',
                header: 'SĐT Phụ huynh',
            },
            {
                accessorKey: 'trangThaiHS',
                header: 'Trạng thái HS',
                accessorFn(originalRow) {
                                    return (<StudentStatusBadge studentStatus={originalRow.trangThaiHS || -1} />)
                                },
            },
            {
                accessorKey: 'ghiChuChung',
                header: 'Ghi chú chung HS',
            },
            {
                accessorKey: 'trangThaiDiemDanh',
                header: 'Trạng thái Điểm Danh',
                accessorFn(originalRow) {
                                    return (<AttendanceStatus classStatus={originalRow.trangThaiDiemDanh} />)
                                },
            },
            {
                accessorKey: 'diemGocBTVN',
                header: 'Điểm gốc BTVN',
            },
            {
                accessorKey: 'diemSuaBTVN',
                header: 'Điểm sửa BTVN',
            },
            {
                accessorKey: 'nhanXet',
                header: 'Nhận xét',
                size: 500
            },
            {
                accessorKey: 'thuongTicker',
                header: 'Thưởng Ticker',
            },
        ], []
    );

    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách học sinh",
                size: "100%"
            }}
            buttonProps={{
                variant: "outline",
                children: "Xem điểm"
            }}
        >
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={studentMockData}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    )
                }}
            />
        </MyButtonModal>
    )
}

export const studentMockData: StudentRecord[] = [
    {
        maHocSinh: "CG23-01030",
        hoTen: "Nguyễn Ngọc Trang Anh",
        sdtPhuHuynh: "0974681988",
        trangThaiHS: 1,
        ghiChuChung: "Chưa làm",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 6,
        nhanXet: "Thiếu bài",
    },
    {
        maHocSinh: "CG23-01040",
        hoTen: "Mẫn Vũ Minh Anh",
        sdtPhuHuynh: "0912378252",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 2,
        diemGocBTVN: 6,
        nhanXet: '"bdTt; bđ; thiếu ý"',
    },
    {
        maHocSinh: "CG24-01159",
        hoTen: "Nguyễn Quốc Minh Châu",
        sdtPhuHuynh: "0964252508",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 8.5,
        nhanXet: '"Thiếu bài; tt; bđ; sai dấu"',
        thuongTicker: 1,
    },
    {
        maHocSinh: "CG23-00685",
        hoTen: "Phạm Ngô Khánh Diệp",
        sdtPhuHuynh: "0969170484",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 6.5,
        nhanXet: '"Thiếu TH; tt;bđ"',
    },
    {
        maHocSinh: "CG24-01157",
        hoTen: "Phạm Hoàng Hải",
        sdtPhuHuynh: "0348689937",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 6,
        nhanXet: '"Thiếu bài"',
    },
    {
        maHocSinh: "CG23-01067",
        hoTen: "Nguyễn Minh Hải",
        sdtPhuHuynh: "0914343189",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 7.5,
        nhanXet: '"tt; thiếu xđ hệ số"',
        thuongTicker: 1,
    },
    {
        maHocSinh: "CG23-01068",
        hoTen: "Trần Bảo Hân",
        sdtPhuHuynh: "0974851010",
        trangThaiHS: 2,
        ghiChuChung: "Chuyển từ 7B2 CG sang ngày 18/02/2025",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 8,
        nhanXet: '"Tt; bđ; thiếu bài"',
    },
    {
        maHocSinh: "CG24-01160",
        hoTen: "Đặng Gia Hân",
        sdtPhuHuynh: "0943831133",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 9.5,
        diemSuaBTVN: "S",
        nhanXet: '"Tt; bđ; kl sai"',
    },
    {
        maHocSinh: "LH8123-00807",
        hoTen: "Nguyễn Văn Huệ",
        sdtPhuHuynh: "0974168931",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 8.5,
        nhanXet: '"Thiếu bài"',
    },
    {
        maHocSinh: "CG23-00931",
        hoTen: "Nguyễn Quang Hùng",
        sdtPhuHuynh: "0974359966",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 7.75,
        nhanXet: '"Tt; bđ; thiếu bài; thiếu kl"',
    },
    {
        maHocSinh: "CG23-00932",
        hoTen: "Lê Thị K",
        sdtPhuHuynh: "0974359967",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 7.0,
        nhanXet: '"Tt; bđ; t/c luỹ thừa"',
    },
    {
        maHocSinh: "CG23-00933",
        hoTen: "Phạm Văn M",
        sdtPhuHuynh: "0974359968",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 8.0,
        nhanXet: '"Tt; bđ; thiếu bài"',
    },
    {
        maHocSinh: "CG23-00934",
        hoTen: "Trần Thị N",
        sdtPhuHuynh: "0974359969",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 6.0,
        nhanXet: '"Tt; thiếu TH; bđ; thiếu bài"',
    },
    {
        maHocSinh: "CG23-00935",
        hoTen: "Hoàng Minh P",
        sdtPhuHuynh: "0974359970",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 9.0,
        nhanXet: '"Thiếu bài; thiếu TH; tt; bđ"',
    },
    {
        maHocSinh: "CG23-00936",
        hoTen: "Vũ Thị Q",
        sdtPhuHuynh: "0974359971",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 7.0,
        nhanXet: '"Xđ sai hệ số; bđ; thiếu bài"',
    },
    {
        maHocSinh: "CG23-00937",
        hoTen: "Đặng Văn R",
        sdtPhuHuynh: "0974359972",
        trangThaiHS: 1,
        ghiChuChung: "",
        trangThaiDiemDanh: 1,
        diemGocBTVN: 8.5,
        nhanXet: '"Tt; bđ"',
    },
];

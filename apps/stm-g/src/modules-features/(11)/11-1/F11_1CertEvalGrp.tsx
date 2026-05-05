"use client"
import baseAxios from '@/api/config/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

// interface INhomThiCanXetChungChi {
//     id?: number;
//     maKhoaThi?: string;
//     tenKhoaThi?: string;
//     maNhomThi?: string;
//     phong?: string;
//     ngay?: Date | undefined;
//     thu?: number;
//     tietbatdau?: number;
//     soTiet?: number;
//     soPhut?: number;
//     trangThai?: number;
//     nguoiCapNhat?: string;
//     ngayCapNhat?: Date | undefined;

// }
interface IExam {
    id?: number;
    code?: string;
    name?: string;
    room?: string;
    date?: Date | undefined;
    thu?: number;
    tietbatdau?: number;
    soTiet?: number;
    soPhut?: number;
    trangThai?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F11_1CertEvalGrp({ value }: { value: IExam }) {
    const disc = useDisclosure()
    const danhSachNhomCanXet = useQuery<IExam[]>({
        queryKey: [`F11_1CertEvalGrp`],
        queryFn: async () => {
            const response = await baseAxios.post("/Exam/Getall");
            return response.data.data
        },
    })
    const columnChonKhoaHoc = useMemo<MRT_ColumnDef<IExam>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã nhóm thi"
            },
            {
                accessorKey: "name",
                header: "Tên khóa thi"
            },

            {
                accessorKey: "phong",
                header: "Phòng thi"
            },
            // {
            //     accessorKey: "ngay",
            //     header: "Ngày thi",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngay!))
            //     },
            // },
            {
                accessorKey: "thu",
                header: "Thứ"
            },
            {
                accessorKey: "tietbatdau",
                header: "Tiết bắt đầu"
            },
            {
                accessorKey: "soTiet",
                header: "Số tiết"
            },
            {
                accessorKey: "soPhut",
                header: "Số phút"
            },
            {
                accessorKey: "trangThai",
                header: "Trạng thái",
                accessorFn(originalRow) {
                    return GetTrangThai(originalRow.trangThai!)?.text ?? "";
                },
            },
            {
                accessorKey: "nguoiCapNhat",
                header: "Người cập nhật"
            },
            {
                accessorKey: "ngayCapNhat",
                header: "Ngày cập nhật",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!))
                },
            }
        ],
        []
    );
    return (
        <Group>
            <MyButtonModal disclosure={disc} modalSize={'70%'} label="Chọn">
                Danh sách nhóm thi cần xét chứng chỉ
                <MyDataTable

                    enableRowSelection={true}
                    columns={columnChonKhoaHoc}
                    enableRowNumbers={true}
                    data={danhSachNhomCanXet.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>

                                    <Button>Chọn</Button>
                                </Group>
                            </>
                        )
                    }}

                />
            </MyButtonModal >
        </Group>
    )
}
// let mockData: INhomThiCanXetChungChi[] = [
//     {
//         id: 1,
//         maKhoaThi: "KT123",
//         tenKhoaThi: "Lập Trình Web",
//         maNhomThi: "N01",
//         phong: "Phòng A1",
//         ngay: new Date("2024-12-15"),
//         thu: 2,
//         tietbatdau: 3,
//         soTiet: 2,
//         soPhut: 90,
//         trangThai: 1, // 1 - Đang mở, 2 - Đã đóng
//         nguoiCapNhat: "Nguyễn Văn A",
//         ngayCapNhat: new Date("2024-12-01")
//     },
//     {
//         id: 2,
//         maKhoaThi: "KT124",
//         tenKhoaThi: "Cơ Sở Dữ Liệu",
//         maNhomThi: "N02",
//         phong: "Phòng B2",
//         ngay: new Date("2024-12-16"),
//         thu: 3,
//         tietbatdau: 5,
//         soTiet: 3,
//         soPhut: 120,
//         trangThai: 1, // 1 - Đang mở, 2 - Đã đóng
//         nguoiCapNhat: "Trần Thị B",
//         ngayCapNhat: new Date("2024-12-02")
//     },
//     {
//         id: 3,
//         maKhoaThi: "KT125",
//         tenKhoaThi: "Kỹ Thuật Mạng",
//         maNhomThi: "N03",
//         phong: "Phòng C3",
//         ngay: new Date("2024-12-17"),
//         thu: 4,
//         tietbatdau: 1,
//         soTiet: 4,
//         soPhut: 180,
//         trangThai: 2, // 1 - Đang mở, 2 - Đã đóng
//         nguoiCapNhat: "Lê Minh C",
//         ngayCapNhat: new Date("2024-12-03")
//     },
//     {
//         id: 4,
//         maKhoaThi: "KT126",
//         tenKhoaThi: "Hệ Điều Hành",
//         maNhomThi: "N04",
//         phong: "Phòng D4",
//         ngay: new Date("2024-12-18"),
//         thu: 5,
//         tietbatdau: 2,
//         soTiet: 3,
//         soPhut: 135,
//         trangThai: 1, // 1 - Đang mở, 2 - Đã đóng
//         nguoiCapNhat: "Phan Hồng D",
//         ngayCapNhat: new Date("2024-12-04")
//     }
// ];
function GetTrangThai(trangThai: number) {
    // Validate input is between 1 and 5
    if (trangThai < 1 || trangThai > 5) {
        throw new Error('Input must be a number between 1 and 5');
    }

    const trangThaiMap: { [key: number]: { text: string, color: string, textColor: string } } = {
        1: {
            text: "Hoàn thành",
            color: "#D3D3D3",
            textColor: "#000000"
        },
        2: {
            text: "Chưa hoàn thành",
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
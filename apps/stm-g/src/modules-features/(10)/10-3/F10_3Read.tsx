'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Anchor, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F10_3Delete from "./F10_3Delete";

interface IXepLichThi {
    id?: number;
    maKhoaThi?: string;
    tenKhoaThi?: string;
    maNhomThi?: string;
    phong?: string;
    ngay?: Date | undefined;
    thu?: number;
    tietbatdau?: number;
    soTiet?: number;
    soPhut?: number;
    trangThai?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F10_3Read() {
    const XepLichThi = useQuery<IXepLichThi[]>({
        queryKey: [`F10_3Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const exportConfig = {
        fields: [
            {
                fieldName: "maKhoaThi",
                header: "Mã khóa thi"
            },
            {
                fieldName: "tenKhoaThi",
                header: "Tên khóa thi"
            },
            {
                fieldName: "maNhomThi",
                header: "Mã nhóm thi"
            },
            {
                fieldName: "phong",
                header: "Phòng thi"
            },
            {
                fieldName: "ngay",
                header: "Ngày thi"
            },
            {
                fieldName: "thu",
                header: "Thứ"
            },
            {
                fieldName: "tietbatdau",
                header: "Tiết bắt đầu"
            },
            {
                fieldName: "soTiet",
                header: "Số tiết"
            },
            {
                fieldName: "soPhut",
                header: "Số phút"
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái"
            },


        ]
    };

    const columns = useMemo<MRT_ColumnDef<IXepLichThi>[]>(
        () => [
            {
                accessorKey: "maKhoaThi",
                header: "Mã khóa thi"
            },
            {
                accessorKey: "tenKhoaThi",
                header: "Tên khóa thi"
            },
            {
                accessorKey: "maNhomThi",
                header: "Mã nhóm thi"
            },
            {
                accessorKey: "phong",
                header: "Phòng thi",
                // accessorFn(originalRow) {
                //     return <ChoosePreferredRoom id={originalRow.id!} />
                // },
            },
            {
                accessorKey: "ngay",
                header: "Ngày thi",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngay!))
                },
            },
            {
                accessorKey: "thu",
                header: "Thứ"
            },
            {
                accessorKey: "tietbatdau",
                header: "Tiết bắt đầu",
                accessorFn(originalRow) {
                    return (<MyNumberInput defaultValue={originalRow.tietbatdau}></MyNumberInput>)
                },
            },
            {
                accessorKey: "soTiet",
                header: "Số tiết",
                accessorFn(originalRow) {
                    return (<MyNumberInput defaultValue={originalRow.soTiet}></MyNumberInput>)
                },
            },
            {
                accessorKey: "soPhut",
                header: "Số phút"
            },
            {
                accessorKey: "trangThai",
                header: "Trạng thái",
                accessorFn: (originalRow) => {
                    // const trangThaiData = GetTrangThai(originalRow.trangThai!);
                    // return <Anchor >{trangThaiData.text}</Anchor>;
                    if (originalRow.trangThai == 1) return <Anchor>Đã diễn ra</Anchor>
                    if (originalRow.trangThai == 2) return <Anchor>Đang diễn ra</Anchor>
                    if (originalRow.trangThai == 3) return <Anchor>Chưa diễn ra</Anchor>
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

    if (XepLichThi.isLoading) return "Đang tải dữ liệu..."
    if (XepLichThi.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={XepLichThi.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <MyButton crudType="create">Xếp lịch thi</MyButton>

                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsGiangVienVaChuyenGia"
                                data={XepLichThi.data!}
                                exportConfig={exportConfig}
                            />
                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsGiangVienVaChuyenGia"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F10_3Delete lecturerAndExpertId={row.original.id!} />
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

    const trangThaiMap: { [key: number]: { text: string } } = {
        1: {
            text: "Đã diễn ra",
        },
        2: {
            text: "Đang diễn ra ",
        },
        3: {
            text: "Chưa diễn ra",
        },

    };


    return trangThaiMap[trangThai];
}
let mockData: IXepLichThi[] = [
    {
        id: 1,
        maKhoaThi: "KT123",
        tenKhoaThi: "Lập Trình Web",
        maNhomThi: "N01",
        phong: "Phòng A1",
        ngay: new Date("2024-12-15"),
        thu: 2,
        tietbatdau: 3,
        soTiet: 2,
        soPhut: 90,
        trangThai: 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-12-01")
    },
    {
        id: 2,
        maKhoaThi: "KT124",
        tenKhoaThi: "Cơ Sở Dữ Liệu",
        maNhomThi: "N02",
        phong: "Phòng B2",
        ngay: new Date("2024-12-16"),
        thu: 3,
        tietbatdau: 5,
        soTiet: 3,
        soPhut: 120,
        trangThai: 1,
        nguoiCapNhat: "Trần Thị B",
        ngayCapNhat: new Date("2024-12-02")
    },
    {
        id: 3,
        maKhoaThi: "KT125",
        tenKhoaThi: "Kỹ Thuật Mạng",
        maNhomThi: "N03",
        phong: "Phòng C3",
        ngay: new Date("2024-12-17"),
        thu: 4,
        tietbatdau: 1,
        soTiet: 4,
        soPhut: 180,
        trangThai: 2,
        nguoiCapNhat: "Lê Minh C",
        ngayCapNhat: new Date("2024-12-03")
    },
    {
        id: 4,
        maKhoaThi: "KT126",
        tenKhoaThi: "Hệ Điều Hành",
        maNhomThi: "N04",
        phong: "Phòng D4",
        ngay: new Date("2024-12-18"),
        thu: 5,
        tietbatdau: 2,
        soTiet: 3,
        soPhut: 135,
        trangThai: 1,
        nguoiCapNhat: "Phan Hồng D",
        ngayCapNhat: new Date("2024-12-04")
    }
];

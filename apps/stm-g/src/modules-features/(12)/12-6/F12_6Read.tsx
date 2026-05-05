'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_6Create from "./F12_6Create";
import F12_6Delete from "./F12_6Delete";
import F12_6DeleteList from "./F12_6DeleteList";
import F12_6Update from "./F12_6Update";
//REVIEW: quuoc thieu review 47511

interface IRoomType {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface IBranch {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface IAddress {
    id?: number;
    code?: string;
    name?: string;
    location?: number;
    block?: number;
    capacity?: number;
    testCapacity?: number;
    roomType?: IRoomType;
    roomTypeId?: number;
    branch?: IBranch;
    branchId?: number;

    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
    // note?: string;
}

//FIXME: chờ sửa api thêm data, đang thiếu chi nhánh và tính chất phòng
export default function F12_6Read() {
    const addressQuery = useQuery<IAddress[]>({
        queryKey: [`F12_6Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/address/getall?cols=RoomType,Branch");
            const result = response.data.data;

            return result
        },
    })

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    const columns = useMemo<MRT_ColumnDef<IAddress>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã phòng"
            },
            {
                accessorKey: "name",
                header: "Tên phòng"
            },
            {
                accessorKey: "branch.name",
                header: "Chi nhánh",
                // accessorFn(originalRow) {
                //     return Getlocation(originalRow.location!).text;
                // },
            },
            {
                accessorKey: "block",
                header: "Dãy"
            },
            {
                accessorKey: "capacity",
                header: "Sức chứa học"
            },
            {
                accessorKey: "testCapacity",
                header: "Sức chứa thi"
            },
            {
                accessorKey: "roomType.name",
                header: "Tính chất phòng",

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

        ],
        []
    );

    if (addressQuery.isLoading) return "Đang tải dữ liệu..."
    if (addressQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={addressQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>

                            <F12_6Create />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple}
                                onSubmit={() => {
                                    console.log(form_multiple.values);
                                }} >s</AQButtonCreateByImportFile>
                            <F12_6DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_6Update data={row.original} />
                        <F12_6Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

function Getlocation(trangThai: number) {
    // Validate input is between 1 and 5
    if (trangThai < 1 || trangThai > 4) {
        throw new Error('Input must be a number between 1 and 4');
    }

    const trangThaiMap: { [key: number]: { text: string } } = {
        1: {
            text: "Thủ Đức",
        },
        2: {
            text: "Cơ sở chính ",
        },
        3: {
            text: "Công nghệ",
        },
        4: {
            text: "Quản lý",
        },

    };


    return trangThaiMap[trangThai];
}
function GetTinhChat(trangThai: number) {
    // Validate input is between 1 and 5
    if (trangThai < 1 || trangThai > 3) {
        throw new Error('Input must be a number between 1 and 5');
    }

    const trangThaiMap: { [key: number]: { text: string } } = {
        1: {
            text: "Vi tính",
        },
        2: {
            text: "Lý thuyết ",
        },

    };


    return trangThaiMap[trangThai];
}

let mockData = [
    {
        id: 1,
        code: 'PH101',
        name: 'Phòng Học Lý Thuyết',
        location: 4,
        block: 'A',
        capacity: 50,
        testCapacity: 40,
        tinhChatPhong: 1,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 2,
        code: 'TH201',
        name: 'Phòng Thực Hành Tin Học',
        location: 1,
        block: 'B',
        capacity: 30,
        testCapacity: 25,
        tinhChatPhong: 1,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 3,
        code: 'LAB301',
        name: 'Phòng Thí Nghiệm Vật Lý',
        location: 4,
        block: 'C',
        capacity: 25,
        testCapacity: 20,
        tinhChatPhong: 1,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 4,
        code: 'GD401',
        name: 'Phòng Giảng Đường Lớn',
        location: 3,
        block: 'A',
        capacity: 100,
        testCapacity: 80,
        tinhChatPhong: 1,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    },
    {
        id: 5,
        code: 'NV501',
        name: 'Phòng Ngoại Vụ',
        location: 2,
        block: 'D',
        capacity: 15,
        testCapacity: 10,
        tinhChatPhong: 1,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    }

]


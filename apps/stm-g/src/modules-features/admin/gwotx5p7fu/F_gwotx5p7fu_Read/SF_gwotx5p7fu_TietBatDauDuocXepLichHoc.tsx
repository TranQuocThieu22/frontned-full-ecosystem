import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
interface I {
    id?: number
    tiet?: number,
    ngayCapNhat?: Date, // tự thêm nếu thiếu
    nguoiCapNhat?: string // tự thêm nếu thiếu
}
export default function SF_gwotx5p7fu_TietBatDauDuocXepLichHoc() {
    const disc = useDisclosure()
    const query = useQuery<I[]>({
        queryKey: [`SF_gwotx5p7fu_TietBatDauDuocXepLichHoc`],
        queryFn: async () => [
            { id: 1, tiet: 1, ngayCapNhat: new Date("2020-02-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 2, tiet: 2, ngayCapNhat: new Date("2020-03-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 3, tiet: 3, ngayCapNhat: new Date("2020-04-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
            { id: 4, tiet: 4, ngayCapNhat: new Date("2020-05-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 5, tiet: 5, ngayCapNhat: new Date("2020-06-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 6, tiet: 6, ngayCapNhat: new Date("2020-07-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
            { id: 7, tiet: 7, ngayCapNhat: new Date("2020-08-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 8, tiet: 8, ngayCapNhat: new Date("2020-09-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 9, tiet: 9, ngayCapNhat: new Date("2020-10-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
            { id: 10, tiet: 10, ngayCapNhat: new Date("2020-11-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 11, tiet: 11, ngayCapNhat: new Date("2020-12-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 12, tiet: 12, ngayCapNhat: new Date("2021-01-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
            { id: 13, tiet: 13, ngayCapNhat: new Date("2021-02-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 14, tiet: 14, ngayCapNhat: new Date("2021-03-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 15, tiet: 15, ngayCapNhat: new Date("2021-04-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>( // tự thêm trường này nếu thiếu
        () => [
            {
                header: "Tiết",
                accessorKey: "tiet",
                Cell: ({ cell }) => <Text>Tiết {cell.getValue<number>()}</Text>,
                size: 670
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat!)),
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            }
        ],
        []
    );
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyButtonModal disclosure={disc} label="Chọn từ danh sách check tiết chứa loại thời gian" title="Check chọn danh sách tiết bắt đầu được phép xếp TKB. (Không chọn tiết nào có nghĩa là không bắt buộc)" modalSize={'xl'}>
            <MyDataTable
                columns={columns}
                data={query.data!}
                enableRowSelection
                enableRowNumbers={false}
                displayColumnDefOptions={
                    {
                        "mrt-row-numbers": {
                            Header: "STT",
                            size: 10
                        },
                    }
                }
            />
            <MyButton crudType="save" onClick={() => {
                notifications.show({
                    title: "Lưu thành công",
                    message: "Danh sách tiết bắt đầu được xếp lịch học đã được cập nhật",
                    color: "teal",
                })
                disc[1].close()
            }} />
        </MyButtonModal>
    )
}



'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Badge, Box, Button, Group, Overlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { I8_3DanhSachLop, I8_3roomPriority } from "./AssignPreferredRoomTable";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";

interface Ibranch {
    id?: number,
    name?: string
}
interface IroomType {
    id?: number,
    name?: string
}
interface I {
    id?: number;
    code?: string; // P0001
    name?: string; // Phòng 01
    capacity?: number; // 50
    roomType?: IroomType// Tính chất phòng
    block?: string; // D
    branch?: Ibranch
    chiNhanh?: string;
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}
export default function ChoosePreferredRoom({ id, danhSachPhong }: { id: number, danhSachPhong?: I8_3roomPriority[] }) {
    const disc = useDisclosure(false)

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const queryClient = useQueryClient()
    const query = useQuery<I[]>({
        queryKey: [`ChoosePreferredRoom`],
        queryFn: async () => {
            const res = await baseAxios.get("/address/getall?cols=roomType,branch")
            return res.data.data
        },
        enabled: disc[0] == true
    });
    function Boundary({ children }: { children?: ReactNode }) {
        return (
            <MyFlexColumn gap={0} style={{ border: danhSachPhong?.length == 0 ? "" : "1px solid gray" }} p={danhSachPhong?.length! > 0 ? '7px' : "0px"} bg={colorsObject.mantineBackgroundBlueLight}>
                <MyButtonModal leftSection={<IconListCheck />} color="violet" title="Chọn phòng" modalSize={'80%'} label="Chọn từ danh sách" disclosure={disc}>
                    {children}
                </MyButtonModal>
                <Box hidden={danhSachPhong?.length! < 1}>
                    {danhSachPhong?.map((item, idx) => (
                        <Box key={idx}>{idx + 1}. {item.status == undefined ? "" : <Badge w={65} color={item.status == "New" ? "blue" : item.status == "Deleted" ? "red" : ""}>{item.status}</Badge>} {item.address?.code} - {item.address?.name} </Box>
                    ))}
                </Box>
            </MyFlexColumn>
        )
    }
    function handleSelect() {
        const selectedIds = Object.keys(rowSelection).map(Number)
        const selectedRooms = query.data?.filter(room => room.id && selectedIds.includes(room.id))
        const queryData = queryClient.getQueryData<I8_3DanhSachLop[]>(["AssignPreferredRoomTable"])

        const updatedData = queryData?.map(item => {
            if (item.id !== id) return item;

            // Danh sách ưu tiên hiện tại
            const currentRooms = item.roomPriority ?? [];

            // Cập nhật trạng thái của các phòng đã chọn
            const updatedRooms = currentRooms.map(room => {
                if (selectedRooms?.some(selected => selected.id === room.addressId)) {
                    return { ...room, status: room.status === "Deleted" ? "New" : room.status };
                }
                return { ...room, status: "Deleted" }; // Nếu không còn được chọn -> Đánh dấu "Delete"
            });

            // Thêm các phòng mới chưa có trong danh sách
            selectedRooms?.forEach(room => {
                if (!updatedRooms.some(r => r.addressId === room.id)) {
                    updatedRooms.push({
                        id: 0,
                        addressId: room.id,
                        code: "string",
                        name: "string",
                        address: room,
                        status: "New"
                    } as I8_3roomPriority);
                }
            });

            return { ...item, roomPriority: updatedRooms };
        });

        queryClient.setQueryData(["AssignPreferredRoomTable"], updatedData);
        disc[1].close();
    }

    useEffect(() => {
        if (danhSachPhong?.length == 0) return
        const result = danhSachPhong!.reduce((acc, item) => {
            if (item.status == "Deleted") {
                return acc
            }
            acc[item.addressId!] = true;
            return acc;
        }, {} as Record<number, boolean>);

        setRowSelection(result)
    }, [danhSachPhong])

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã phòng",
            accessorKey: "code",
        },
        {
            header: "Tên phòng",
            accessorKey: "name"
        },
        {
            header: "Sức chứa học",
            accessorKey: "capacity",
        },
        {
            header: "Tính chất",
            accessorKey: "roomType.name",
        },
        {
            header: "Dãy",
            accessorKey: "block",
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch.name",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => row.ngayCapNhat ? new Date(row.ngayCapNhat!).toLocaleDateString("vi-VN") : ""
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        }
    ], [danhSachPhong]);

    if (query.isLoading) return (
        <Boundary>
            <Overlay color="#000" backgroundOpacity={0.35} blur={15} />
        </Boundary>
    )
    if (query.isError) return (
        <Boundary>
            Có lỗi xảy ra!
        </Boundary>
    )
    return (
        <Boundary>
            <MyDataTable
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <Button onClick={handleSelect}>Chọn</Button>
                        </Group>
                    )
                }}
                columns={columns}
                data={query.data!}
                enableRowSelection
                getRowId={(row) => row.id?.toString()}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
            />
        </Boundary>
    );
}

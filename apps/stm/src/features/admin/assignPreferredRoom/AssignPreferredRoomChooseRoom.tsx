'use client'
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Badge, Box, Group, Overlay, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { I8_3DanhSachLop, I8_3roomPriority } from "./AssignPreferredRoomTable";

interface IBranch {
    id?: number;
    name?: string;
}
interface IRoomType {
    id?: number;
    name?: string;
}
interface IRoom {
    id?: number;
    code?: string;
    name?: string;
    capacity?: number;
    roomType?: IRoomType;
    block?: string;
    branch?: IBranch;
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}

export default function AssignPreferredRoomChooseRoom({
    id,
    danhSachPhong,
}: {
    id: number;
    danhSachPhong?: I8_3roomPriority[];
}) {
    const disc = useDisclosure(false);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const queryClient = useQueryClient();

    const query = useQuery<IRoom[]>({
        queryKey: ["AssignPreferredRoomChooseRoom"],
        queryFn: async () => {
            const res = await baseAxios.get("/address/getall?cols=roomType,branch");
            return res.data.data;
        },
        enabled: disc[0] === true,
    });

    useEffect(() => {
        if (!danhSachPhong?.length) return;
        const result = danhSachPhong.reduce<Record<number, boolean>>((acc, item) => {
            if (item.status !== "Deleted") acc[item.addressId!] = true;
            return acc;
        }, {});
        setRowSelection(result);
    }, [danhSachPhong]);

    function handleSelect() {
        const selectedIds = Object.keys(rowSelection).map(Number);
        const selectedRooms = query.data?.filter((room) => room.id && selectedIds.includes(room.id));
        const queryData = queryClient.getQueryData<I8_3DanhSachLop[]>(["AssignPreferredRoomTable"]);

        const updatedData = queryData?.map((item) => {
            if (item.id !== id) return item;
            const currentRooms = item.roomPriority ?? [];
            const updatedRooms = currentRooms.map((room) => {
                if (selectedRooms?.some((selected) => selected.id === room.addressId)) {
                    return { ...room, status: room.status === "Deleted" ? ("New" as const) : room.status };
                }
                return { ...room, status: "Deleted" as const };
            });
            selectedRooms?.forEach((room) => {
                if (!updatedRooms.some((r) => r.addressId === room.id)) {
                    updatedRooms.push({
                        id: 0,
                        addressId: room.id,
                        code: "string",
                        name: "string",
                        address: room as any,
                        status: "New",
                    } as I8_3roomPriority);
                }
            });
            return { ...item, roomPriority: updatedRooms };
        });

        queryClient.setQueryData(["AssignPreferredRoomTable"], updatedData);
        disc[1].close();
    }

    const columns = useMemo<CustomColumnDef<IRoom>[]>(
        () => [
            { header: "Mã phòng", accessorKey: "code" },
            { header: "Tên phòng", accessorKey: "name" },
            { header: "Sức chứa", accessorKey: "capacity" },
            { header: "Tính chất", accessorKey: "roomType.name" },
            { header: "Dãy", accessorKey: "block" },
            { header: "Chi nhánh", accessorKey: "branch.name" },
            {
                header: "Ngày cập nhật",
                id: "ngayCapNhat",
                accessorFn: (row) =>
                    row.ngayCapNhat ? new Date(row.ngayCapNhat).toLocaleDateString("vi-VN") : "",
            },
            { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        ],
        [danhSachPhong]
    );

    return (
        <Stack
            gap={4}
            style={{ border: danhSachPhong?.length ? "1px solid gray" : undefined }}
            p={danhSachPhong?.length ? "7px" : "0px"}
            bg={colorsObject.mantineBackgroundBlueLight}
        >
            <CustomButtonModal
                disclosure={disc}
                buttonProps={{
                    children: "Chọn từ danh sách",
                    leftSection: <IconListCheck />,
                    color: "violet",
                }}
                modalProps={{ title: "Chọn phòng", size: "80%" }}
            >
                {query.isLoading ? (
                    <Overlay color="#000" backgroundOpacity={0.35} blur={15} />
                ) : query.isError ? (
                    "Có lỗi xảy ra!"
                ) : (
                    <CustomDataTable
                        renderTopToolbarCustomActions={() => (
                            <Group>
                                <CustomButton onClick={handleSelect}>Chọn</CustomButton>
                            </Group>
                        )}
                        columns={columns}
                        data={query.data ?? []}
                        enableRowSelection
                        getRowId={(row) => row.id?.toString()}
                        onRowSelectionChange={setRowSelection}
                        state={{ rowSelection }}
                    />
                )}
            </CustomButtonModal>

            <Box hidden={!danhSachPhong?.length}>
                {danhSachPhong?.map((item, idx) => (
                    <Box key={idx}>
                        {idx + 1}.{" "}
                        {item.status && (
                            <Badge
                                w={65}
                                color={
                                    item.status === "New"
                                        ? "blue"
                                        : item.status === "Deleted"
                                        ? "red"
                                        : undefined
                                }
                            >
                                {item.status}
                            </Badge>
                        )}{" "}
                        {item.address?.code} - {item.address?.name}
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}

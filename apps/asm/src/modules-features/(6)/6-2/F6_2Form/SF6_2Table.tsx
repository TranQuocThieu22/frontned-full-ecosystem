'use client';
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    tenTaiSanYeuCau?: string; // Màn hình 25 Inc
    moTaLoi?: string; // Không lên hình
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function SF6_2Table() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTaiSanYeuCau`],
        queryFn: async () => [
            {
                id: 1,
                tenTaiSanYeuCau: "Màn hình 25 Inc",
                moTaLoi: "Không lên hình",
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                id: 2,
                tenTaiSanYeuCau: "Máy in HP LaserJet",
                moTaLoi: "In bị mờ",
                ngayCapNhat: new Date("2025-01-17T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Tên tài sản yêu cầu",
            accessorKey: "tenTaiSanYeuCau",
        },
        {
            header: "Mô tả lỗi",
            accessorKey: "moTaLoi",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => new Date(row.ngayCapNhat!).toLocaleDateString("vi-VN"),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh sách tài sản">
            <MyDataTable
                columns={columns}
                data={query.data!}
                exportAble
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button leftSection={<IconPlus />}>Thêm</Button>
                        <MyButton crudType="delete" />
                        <MyButton crudType="import" />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <MyActionIcon crudType="delete" />
                    </MyCenterFull>
                )}
            />
        </Fieldset>
    );
}

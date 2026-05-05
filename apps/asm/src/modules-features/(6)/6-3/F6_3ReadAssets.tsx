'use client';
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

export default function F6_3ReadAssets() {
    const disc = useDisclosure()
    const query = useQuery<I[]>({
        queryKey: [`F6_3ReadAssets`],
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
                tenTaiSanYeuCau: "Máy in",
                moTaLoi: "Kẹt giấy",
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
        <MyButtonModal title="Chi tiết yêu cầu" modalSize="xl" disclosure={disc} label="Xem">
            <Fieldset legend="Danh sách tài sản">
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    exportAble
                />
            </Fieldset>
        </MyButtonModal>
    );
}

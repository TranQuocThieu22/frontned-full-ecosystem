"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useListState } from "@mantine/hooks";
import { Button, Fieldset, Group, Tabs } from "@mantine/core";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { IconPlus } from "@tabler/icons-react";

interface I {
    id?: number;
    maTaiSan?: string; // TV55SS
    tenTaiSan?: string; // Màn hình 25 Inch
    maVach?: string; // TS02356
    donViSuDung?: string; // Phòng Hành chính
    giaTriMuaMoi?: string; // 5.000.000
    giaTriDauKy?: number; // 4.950.000
    giaTriDaPhanBo?: number; // 50.000
    giaTriConLai?: number; // 4.900.000
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function SF5_5Form_Tab_1() {
    const query = useQuery<I[]>({
        queryKey: [`SF5_5Form_Tab_1`],
        queryFn: async () => [
            {
                id: 1,
                maTaiSan: "TV55SS",
                tenTaiSan: "Màn hình 25 Inch",
                maVach: "TS02356",
                donViSuDung: "Phòng Hành chính",
                giaTriMuaMoi: "5.000.000",
                giaTriDauKy: 4950000,
                giaTriDaPhanBo: 50000,
                giaTriConLai: 4900000,
                ngayCapNhat: new Date("2025-01-10T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A"
            },
            {
                id: 2,
                maTaiSan: "TV75XS",
                tenTaiSan: "Màn hình 27 Inch",
                maVach: "TS02357",
                donViSuDung: "Phòng Kế toán",
                giaTriMuaMoi: "6.000.000",
                giaTriDauKy: 5950000,
                giaTriDaPhanBo: 50000,
                giaTriConLai: 5900000,
                ngayCapNhat: new Date("2025-01-12T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B"
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã tài sản",
                accessorKey: "maTaiSan",
            },
            {
                header: "Tên tài sản",
                accessorKey: "tenTaiSan",
            },
            {
                header: "Mã vạch",
                accessorKey: "maVach",
            },
            {
                header: "Đơn vị sử dụng",
                accessorKey: "donViSuDung",
            },
            {
                header: "Giá trị mua mới",
                accessorKey: "giaTriMuaMoi",
            },
            {
                header: "Giá trị đầu kỳ",
                accessorKey: "giaTriDauKy",
                Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
            },
            {
                header: "Giá trị đã phân bổ",
                accessorKey: "giaTriDaPhanBo",
                Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
            },
            {
                header: "Giá trị còn lại",
                accessorKey: "giaTriConLai",
                Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
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
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <Tabs.Panel value="Danh sách tài sản thanh lý">
            <Fieldset legend="Danh sách tài sản">
                <MyDataTable
                    exportAble
                    data={query.data!}
                    columns={columns}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <Button leftSection={<IconPlus />} color="indigo">Thêm</Button>
                            <MyButton crudType="delete" />
                            <MyButton crudType="import" />
                        </Group>
                    )}
                // renderRowActions={() => (
                //     <MyCenterFull>
                //         <MyActionIcon crudType="update" />
                //         <MyActionIcon crudType="delete" />
                //     </MyCenterFull>
                // )}
                />
            </Fieldset>
        </Tabs.Panel>
    );
}

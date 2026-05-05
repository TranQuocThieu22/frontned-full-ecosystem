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
    hoVaTen?: string; // Tô Ngọc Lâm
    chucVu?: string; // Kế toán trưởng
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function SF5_5Form_Tab_2() {
    const query = useQuery<I[]>({
        queryKey: [`SF5_5Form_Tab_2`],
        queryFn: async () => [
            {
                id: 1,
                hoVaTen: "Tô Ngọc Lâm",
                chucVu: "Kế toán trưởng",
                ngayCapNhat: new Date("2025-01-14T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                id: 2,
                hoVaTen: "Phạm Hồng Minh",
                chucVu: "Nhân viên IT",
                ngayCapNhat: new Date("2025-01-15T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "hoVaTen",
            },
            {
                header: "Chức vụ",
                accessorKey: "chucVu",
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
        <Tabs.Panel value="Thành phần tham gia">
            <Fieldset legend="Thành phần tham gia">
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
                    renderRowActions={() => (
                        <MyCenterFull>
                            {/* <MyActionIcon crudType="update" /> */}
                            <MyActionIcon crudType="delete" />
                        </MyCenterFull>
                    )}
                />
            </Fieldset>
        </Tabs.Panel>
    );
}

'use client';

import { branchService } from "@/shared/APIs/branchService";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_gqe7967fsa_Delete from "./F_gqe7967fsa_Delete";
import F_gqe7967fsa_DeleteList from "./F_gqe7967fsa_DeleteList";
import F_gqe7967fsa_Form from "./F_gqe7967fsa_Form";
import { Branch } from "@/shared/interfaces/branch";

export default function F_gqe7967fsa_Read() {
    const getAllBranchQuery = useMyReactQuery({
        queryKey: ["getAllBranchQuery"],
        axiosFn: () => branchService.getAll()
    });

    const columns = useMemo<MRT_ColumnDef<Branch>[]>(
        () => [
            {
                header: "Mã chi nhánh",
                accessorKey: "code",
            },
            {
                header: "Tên chi nhánh",
                accessorKey: "name",
            },
            {
                header: "Địa chỉ",
                accessorKey: "location",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "modifiedWhen",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<Date>())),
            },
            {
                header: "Người cập nhật",
                accessorKey: "modifiedFullName",
            },
        ],
        []
    );

    if (getAllBranchQuery.isLoading) return "Đang tải dữ liệu...";
    if (getAllBranchQuery.isError) return "Không có dữ liệu...";
    return (
        <MyDataTable
            columns={columns}
            data={getAllBranchQuery.data!}
            exportAble
            renderTopToolbarCustomActions={({ table }) =>
                <Group>
                    <F_gqe7967fsa_Form />
                    <F_gqe7967fsa_DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    <MyButton crudType="import" />
                </Group>
            }
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_gqe7967fsa_Form values={row.original} />
                    <F_gqe7967fsa_Delete values={row.original} />
                </MyCenterFull>
            )}
        />
    );
}

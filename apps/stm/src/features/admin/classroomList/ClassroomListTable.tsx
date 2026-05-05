'use client'
import { addressService } from "@/shared/APIs/addressService";
import { Address } from "@/shared/interfaces/address";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import ClassroomListCreateUpdate from "./ClassroomListCreateUpdate";

export default function ClassroomListTable() {
    const query = useCustomReactQuery({
        queryKey: ["addressService.getAll"],
        axiosFn: () => addressService.getAll({ cols: ["RoomType", "Branch"] })
    })

    const columns = useMemo<CustomColumnDef<Address>[]>(() => [
        { accessorKey: "code", header: "Mã phòng" },
        { accessorKey: "name", header: "Tên phòng" },
        { accessorKey: "branch.name", header: "Chi nhánh" },
        { accessorKey: "block", header: "Dãy" },
        { accessorKey: "capacity", header: "Sức chứa học" },
        { accessorKey: "testCapacity", header: "Sức chứa thi" },
        { accessorKey: "roomType.name", header: "Tính chất phòng" },
    ], [])

    return (
        <CustomDataTableAPI
            enableRowSelection
            enableRowNumbers
            columns={columns}
            query={query}
            exportProps={{ fileName: "Danh sách phòng học" }}
            deleteFn={(id) => addressService.delete(id)}
            deleteListFn={(ids) => addressService.deleteListIds(ids)}
            renderTopToolbarCustomActions={() => <ClassroomListCreateUpdate />}
            renderRowActions={({ row }) => <ClassroomListCreateUpdate values={row.original} />}
        />
    )
}

'use client'

import { programService } from "@/shared/APIs/programService";
import { Program } from "@/shared/interfaces/program";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import ProgramListCreateUpdate from "./ProgramListCreateUpdate";

export default function ProgramListTable() {
    const columns = useMemo<CustomColumnDef<Program>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        { header: "Loại chương trình", accessorKey: "programType.name" },
        { header: "Có tổ chức thi", accessorKey: "isTesting", type: "squareCheck" },
        {
            header: "Có cấp chứng chỉ chứng nhận",
            accessorFn: (row) => row.certificateId != null,
            type: "squareCheck",
        },
        { header: "Dừng đào tạo", accessorKey: "isCancel", type: "squareCheck" },
        { header: "Tổng số tiết", accessorKey: "totalClassPeriodNumber" },
        { header: "Học phí (gợi ý)", accessorKey: "price", type: "currency" },
    ], []);

    const programQuery = useCustomReactQuery({
        queryKey: ["programs"],
        axiosFn: () => programService.getAll({ cols: ["ProgramType"] }),
    });

    return (
        <CustomFieldset title="Danh mục chương trình học">
            <CustomDataTableAPI
                query={programQuery}
                columns={columns}
                enableRowSelection
                enableRowNumbers
                deleteFn={programService.delete}
                deleteListFn={programService.deleteListIds}
                exportProps={{ fileName: "Danh mục chương trình học" }}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <ProgramListCreateUpdate />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <ProgramListCreateUpdate values={row.original} />
                )}
            />
        </CustomFieldset>
    );
}


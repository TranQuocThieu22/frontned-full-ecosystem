import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Stack } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function Tab_TAP_ApplicantList({ data }: { data: SRMTopicMember[] }) {
    const column = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(() => [
        { header: "Mã viên chức", accessorKey: "user.code", size: 150 },
        { header: "Họ tên", accessorKey: "user.fullName", size: 350 },
        { header: "Ngày sinh", accessorKey: "user.dateOfBirth", accessorFn: (row) => row.user?.dateOfBirth ? dateUtils.toDDMMYYYY(row.user?.dateOfBirth) : "" },
        { header: "Giới tính", accessorKey: "user.gender", accessorFn: (row) => row.user?.gender === 1 ? "Nam" : row.user?.gender === 0 ? "Nữ" : "" },
        { header: "Đơn vị", accessorKey: "user.workingUnit.name", size: 300 },
        { header: "Vai trò", accessorKey: "srmTitle.name" },
    ], []);
    return (
        <Stack>
            <CustomDataTable
                columns={column}
                data={data || []}
                enableRowSelection
            />
        </Stack>
    )
}

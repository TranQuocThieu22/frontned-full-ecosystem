import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ReviewPublishInternalMember({ data }: { data?: SRMPublicationDeclaration }) {

    const columns = useMemo<MRT_ColumnDef<SRMDeclarationMember>[]>(() => [
        { header: "Mã tác giả", accessorKey: "user.code" },
        { header: "Họ tên tác giả", accessorKey: "user.fullName" },
        { header: "Đơn vị", accessorKey: "user.workingUnitName" },
        { header: "Vai trò", accessorKey: "srmTitle.name" },
        { header: "Tỉ lệ % đóng góp", accessorKey: "contributionRate" },
    ], [data]);
    return (
        <CustomDataTable
            columns={columns}
            enableRowSelection
            data={data?.srmDeclarationMemberInternals || []}
        />
    );
}

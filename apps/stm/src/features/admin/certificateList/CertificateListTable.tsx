'use client'
import { certificateService } from "@/shared/APIs/certificateService";
import { Certificate } from "@/shared/interfaces/certificate";
import { enum_certificateTypes } from "@/constants/enum/enum_certificateTypes";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import CertificateListCreateUpdate from "./CertificateListCreateUpdate";

export default function CertificateListTable() {
    const query = useCustomReactQuery({
        queryKey: ["getAllCertificate_query"],
        axiosFn: () => certificateService.getAll({ params: "?cols=SkillCenter" })
    })

    const columns = useMemo<CustomColumnDef<Certificate>[]>(() => [
        { header: "Mã chứng chỉ", accessorKey: "code" },
        { header: "Tên chứng chỉ", accessorKey: "name" },
        { header: "Phân loại", accessorFn: (row) => enum_certificateTypes[row.type!] },
        { header: "Trung tâm", accessorKey: "skillCenter.name" },
    ], []);

    return (
        <CustomDataTableAPI
            query={query}
            columns={columns}
            enableRowSelection={true}
            enableRowNumbers={true}
            deleteFn={(id) => certificateService.delete(id)}
            deleteListFn={(ids) => certificateService.deleteListIds(ids)}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <CertificateListCreateUpdate />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <CertificateListCreateUpdate values={row.original} />
            )}
        />
    );
}

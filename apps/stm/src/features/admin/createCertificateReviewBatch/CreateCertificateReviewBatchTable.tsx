'use client'
import { certificateReviewBatchService } from "@/shared/APIs/certificateReviewBatchService";
import { CertificateReviewBatch } from "@/shared/interfaces/certificateReviewBatch";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Group } from "@mantine/core";
import { useMemo } from "react";
import CreateCertificateReviewBatchCreateUpdate from "./CreateCertificateReviewBatchCreateUpdate";
import CreateCertificateReviewBatchQualifiedStudents from "./CreateCertificateReviewBatchQualifiedStudents";

export default function CreateCertificateReviewBatchTable() {
    const query = useCustomReactQuery({
        queryKey: ["certificateReviewBatchService.getAll"],
        axiosFn: () => certificateReviewBatchService.getAll({ cols: ["Certificate", "Exams"] })
    })

    const columns = useMemo<CustomColumnDef<CertificateReviewBatch>[]>(() => [
        { header: "Mã đợt xét cấp chứng chỉ", accessorKey: "code" },
        { header: "Tên đợt xét cấp chứng chỉ", accessorKey: "name" },
        {
            header: "Danh sách khóa thi",
            accessorFn: (row) => row.exams?.map(e => e.name).join(", "),
            Cell: ({ row }) => (
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {row.original.exams?.map(e => e.name).join("\n")}
                </div>
            ),
        },
        { header: "Chứng chỉ", accessorKey: "certificate.name" },
        {
            header: "Danh sách đạt",
            id: "qualifiedStudents",
            accessorFn: () => "",
            Cell: ({ row }) => (
                <CreateCertificateReviewBatchQualifiedStudents
                    label="Xem"
                    color="indigo"
                    values={{ examIds: row.original.exams?.map(e => e.id).filter((id): id is number => id !== undefined) ?? [] }}
                />
            ),
        },
    ], [])

    return (
        <CustomDataTableAPI
            enableRowSelection
            enableRowNumbers
            columns={columns}
            query={query}
            deleteFn={(id) => certificateReviewBatchService.delete(id)}
            deleteListFn={(ids) => certificateReviewBatchService.deleteListIds(ids)}
            exportProps={{ fileName: "tao-dot-xet-chung-chi" }}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <CreateCertificateReviewBatchCreateUpdate />
                    <Button>Xét chứng chỉ</Button>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <CreateCertificateReviewBatchCreateUpdate values={row.original} />
            )}
        />
    )
}

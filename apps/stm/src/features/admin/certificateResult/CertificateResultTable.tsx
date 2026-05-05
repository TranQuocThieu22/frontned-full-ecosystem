'use client'
import { certificateResultService } from "@/shared/APIs/certificateResultService";
import { CertificateResult } from "@/shared/interfaces/certificateResult";
import { ENUM_GENDER } from "@/constants/enum/global";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center, Checkbox } from "@mantine/core";
import { useMemo } from "react";

export default function CertificateResultTable() {
    const query = useCustomReactQuery({
        queryKey: ["certificateResultService.getAll"],
        axiosFn: () => certificateResultService.getAll({ cols: ["User", "Exam", "CertificateDecision"] })
    })

    const columns = useMemo<CustomColumnDef<CertificateResult>[]>(() => [
        { header: "Họ tên", accessorKey: "user.fullName" },
        {
            header: "Giới tính",
            accessorFn: (row) => ENUM_GENDER[row.user?.gender!]
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.user?.dateOfBirth)
        },
        { header: "Mã khóa thi", accessorKey: "exam.code" },
        {
            header: "Ngày thi",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.exam?.officialExamDate)
        },
        { header: "Điểm thi", accessorKey: "point" },
        {
            header: "Đạt thi",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt"
        },
        {
            header: "Đạt CC",
            id: "isPassCC",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt",
            Cell: ({ row }) => (
                <Center>
                    <Checkbox readOnly checked={row.original.isPass} color="green" onChange={() => { }} />
                </Center>
            ),
            size: 120
        },
    ], []);

    return (
        <CustomDataTableAPI
            enableRowSelection
            enableRowNumbers
            columns={columns}
            query={query}
            exportProps={{ fileName: "ket-qua-xet-chung-chi" }}
        />
    )
}

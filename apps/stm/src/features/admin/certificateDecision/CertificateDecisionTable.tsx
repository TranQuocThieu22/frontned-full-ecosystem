"use client"
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Center, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import CertificateDecisionCreate from './CertificateDecisionCreate';
import CertificateDecisionDelete from './CertificateDecisionDelete';
import CertificateDecisionUpdate from './CertificateDecisionUpdate';
import { ICertificateDecision } from './interfaces';

export default function CertificateDecisionTable() {
    const query = useQuery<ICertificateDecision[]>({
        queryKey: [`allCertificateDecision`],
        queryFn: async () => {
            const response = await baseAxios.get(`/CertificateDecision/GetAll?cols=signatureUser,certificate`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<CustomColumnDef<ICertificateDecision>[]>(() => [
        { header: "Số quyết định", accessorKey: "code" },
        {
            header: "Ngày quyết định",
            accessorFn: (row) => row.date ? utils_date_dateToDDMMYYYString(new Date(row.date)) : ""
        },
        { header: "Tên quyết định", accessorKey: "name" },
        { header: "Người ký", accessorFn: () => 'Chưa có dữ liệu' },
        { header: "File quyết định", accessorFn: () => "Chưa có dữ liệu" },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <CustomDataTable
            columns={columns}
            data={query.data || []}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <CertificateDecisionCreate />
                    <Button color="teal">Export</Button>
                    <Button color="green">Import</Button>
                    <Button color="red">Xóa</Button>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <Center>
                    <Group gap={8}>
                        <CertificateDecisionUpdate certificateDecisionValues={row.original} />
                        <CertificateDecisionDelete
                            certficateDecisionId={row.original.id}
                            certficateDecisionCode={row.original.code ?? null}
                        />
                    </Group>
                </Center>
            )}
        />
    )
}

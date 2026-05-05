"use client"
import baseAxios from '@/api/config/baseAxios';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import CertificateDecisionCreateButton from './CertificateDecisionCreateButton';
import CertificateDecisionDeleteActionIcon from './CertificateDecisionDeleteActionIcon';
import CertificateDecisionUpdateActionIcon from './CertificateDecisionUpdateActionIcon';
import { ICertificateDecision } from './Interfaces/Interfaces';


export default function CertificateDecisionTable() {
    const allCertificateDecision = useQuery<ICertificateDecision[]>({
        queryKey: [`allCertificateDecision`],
        queryFn: async () => {
            let cols = "signatureUser,certificate";
            const response = await baseAxios.get(`/CertificateDecision/GetAll?cols=${cols}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<ICertificateDecision>[]>(() =>
        [
            {
                header: "Số quyết định",
                accessorKey: "code",
            },
            {
                header: "Ngày quyết định",
                accessorFn(originalRow) {
                    return originalRow.date ? utils_date_dateToDDMMYYYString(new Date(originalRow.date)) : ""; // Format the date
                },
            },
            {
                header: "Tên quyết định",
                accessorKey: "name",
            },
            {
                header: "Người ký",
                accessorFn(originalRow) {
                    return 'Chưa có dữ liệu';
                },
            }, {
                header: "File quyết định",
                accessorFn: () => "Chưa có dữ liệu",
                // accessorFn: (row) => {
                //     return (
                //         <MyCenterFull>
                //             <MyButtonViewPDF id={row.id} />
                //         </MyCenterFull>
                //     )
                // }
            },
        ],
        []
    );

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allCertificateDecision.data || []}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <CertificateDecisionCreateButton />
                                <Button color='teal'>Export</Button>
                                <Button color='green'>Import</Button>
                                <Button color='red'>Xóa</Button>
                            </Group>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <Group gap={8}>
                                <CertificateDecisionUpdateActionIcon
                                    certificateDecisionValues={row.original}
                                />
                                <CertificateDecisionDeleteActionIcon
                                    certficateDecisionId={row.original.id}
                                    certficateDecisionCode={row.original.code === null ? null : row.original.code}
                                />
                            </Group>
                        </MyCenterFull>
                    )
                }}
            >
            </MyDataTable>
        </>

    )
}

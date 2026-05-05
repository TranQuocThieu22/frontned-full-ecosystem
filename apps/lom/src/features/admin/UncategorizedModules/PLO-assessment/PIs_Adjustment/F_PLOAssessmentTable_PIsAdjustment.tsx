'use client'
import { service_COEPI } from "@/api/services/service_COEPI";
import { service_COEPLO } from "@/api/services/service_COEPLO";
import { COEPI } from "@/interfaces/shared-interfaces/COEPI";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Group, Table, Text } from "@mantine/core";
import { useMemo } from "react";
import F_PLOAssessmentCreate_PIsAdjustment from "./F_PLOAssessmentCreate_PIsAdjustment";
import F_PLOAssessmentDelete_PIsAdjustment from "./F_PLOAssessmentDelete_PIsAdjustment";
import F_PLOAssessmentUpdate_PIsAdjustment from "./F_PLOAssessmentUpdate_PIsAdjustment";



export default function IPis_Read({ id, name }: { id: number, name: string }) {
    const queryPIs = useCustomReactQuery({
        queryKey: ["IPis_Read", id],
        axiosFn: async () => {
            // const result = await baseAxios.get(`/COEPI/GetSubjectByGradeId?COEGradeId=${id}&cols=COEPLO`);
            const result = await service_COEPI.getSubjectByGradeId({ coeGradeId: id, cols: "COEPLO" })
            return result
        },
        // refetchOnWindowFocus: false,
    });
    const ploId = useCustomReactQuery({
        queryKey: ["ploID", id],
        axiosFn: async () => {
            // const result = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?COEGradeId=${id}`)
            const result = await service_COEPLO.getCOEPLOByGrade({ coeGradeId: id })
            return result
        },
        // refetchOnWindowFocus: false,
    });

    const columns = useMemo<CustomColumnDef<COEPI>[]>(() => [
        {
            header: "Mã PLO",
            accessorKey: "coeplocode",
            // Cell: ({ row }) => row.original.coeplo?.code,
            accessorFn: (row) => row.coeplo?.code,
            importFieldProps: {
                isRequired: true,
            },
            size: 100
        },
        {
            header: "Tỷ trọng PLO (%)",
            accessorKey: "coeplo.densityPLO",
            // Cell: ({ row }) => `${row.original.coeplo?.densityPLO}%`,
            accessorFn: (row) => row.coeplo?.densityPLO,
            size: 80
        },
        {
            header: "Mã PIs",
            accessorKey: "code",
            // Cell: ({ row }) => row.original.code, 
            accessorFn: (row) => row.code,
            importFieldProps: {
                isRequired: true,
            },
            size: 100
        },
        {
            header: "Tỷ trọng PIs (%)",
            accessorKey: "densityPI",
            // Cell: ({ row }) => `${row.original.densityPI}%`, 
            accessorFn: (row) => row.densityPI,
            importFieldProps: { parseType: "number" },
            size: 80
        },
        {
            header: "Mô tả",
            accessorKey: "description",
            // Cell: ({ row }) => row.original.description, 
            accessorFn: (row) => row.description,
            importFieldProps: {},
            size: 560
        },
    ], []);

    const contentToPrint = () => {
        // Get unique PLO codes and their data
        const ploCodes = Array.from(new Set(queryPIs.data?.map((item: any) => item.coeplo.code) || [])) as string[];

        return (
            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học</Text>
                </CustomFlexColumn>
                <hr style={{ border: "1px solid gray", width: "35%", margin: "auto" }} />
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>CHUẨN ĐẦU RA MÔN HỌC</Text>
                    <Text fw={'bold'} tt={"uppercase"}>CHƯƠNG TRÌNH: {name}</Text>
                </CustomFlexColumn>
                <Text>Chuẩn đầu ra chương trình đào tạo</Text>
                {/* Table */}
                <Table style={{ border: "1px solid black", marginTop: '20px' }}>
                    <Table.Thead style={{ border: "1px solid black" }}>
                        <Table.Tr style={{ border: "1px solid black" }}>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Chuẩn đầu ra chương trình</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Chỉ số thực hiện đo lường (CLO)</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Tỷ trọng</Table.Th>
                            <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Mô tả CĐR</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {ploCodes.map((ploCode: string) => {
                            // Get all PIs for this PLO
                            const pisForPlo = queryPIs.data?.filter((item: any) =>
                                item.coeplo.code === ploCode
                            ) || [];

                            return pisForPlo.map((item: any, index: number) => (
                                <Table.Tr key={`pi-${item.code}`} style={{ border: "1px solid black" }}>
                                    {index === 0 && (
                                        <Table.Td
                                            ta="center"
                                            rowSpan={pisForPlo.length}
                                            style={{ border: "1px solid black", padding: '8px', verticalAlign: 'middle' }}
                                        >
                                            {ploCode}
                                        </Table.Td>
                                    )}
                                    <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.code}</Table.Td>
                                    <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.densityPI}%</Table.Td>
                                    <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.description}</Table.Td>
                                </Table.Tr>
                            ));
                        })}
                    </Table.Tbody>
                </Table>
            </CustomFlexColumn>
        )
    }
    if (queryPIs.isLoading) return "Loading...";

    return (
        <CustomFlexColumn>
            <CustomDataTableAPI
                enableRowSelection={true}
                enableRowNumbers={true}
                exportProps={{
                    fileName: "Danh sách Chi tiết chuẩn đầu ra chương trình đào tạo (PIs)",
                }}
                deleteListFn={service_COEPI.deleteListIds}
                buttonImportProps={{
                    fileName: "Mẫu import danh sách Chi tiết chuẩn đầu ra chương trình đào tạo (PIs)",
                    onSubmit: (data) => {
                        return service_COEPI.importPIByCode(data.map(item => ({
                            /** import bằng mã */
                            ploCode: item.coeplocode,
                            coeGradeId: id,
                            description: item.description,
                            densityPI: item.densityPI,
                            code: item.code
                        })))
                    },
                    onPrepareWorkbook: (workbook) => {
                        excelUtils.addSheet({
                            workbook, config: [
                                {
                                    fieldKey: "code",
                                    fieldName: "Mã PLO",
                                },
                                {
                                    fieldKey: "description",
                                    fieldName: "Mô tả PLO",
                                },

                            ],
                            data: ploId.data ?? [],
                            sheetName: "Danh sách PLO"
                        })
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group m={5}>
                        <F_PLOAssessmentCreate_PIsAdjustment data={ploId.data ?? []} />
                        {/* <PrototypeImportButton/>
                        <PrototypeExportButton/>
                        <PrototypeDeleteAllButton/> */}
                        <CustomButtonPrintPDF>
                            {contentToPrint()}
                        </CustomButtonPrintPDF>
                    </Group>
                )}
                columns={columns}
                query={queryPIs}
                renderRowActions={({ row }) => (
                    <CustomFlexColumn>
                        <F_PLOAssessmentUpdate_PIsAdjustment data={row.original} />
                        <F_PLOAssessmentDelete_PIsAdjustment id={row.original.id!} code={row.original.code!} />
                    </CustomFlexColumn>
                )}
            />
        </CustomFlexColumn>
    );
}

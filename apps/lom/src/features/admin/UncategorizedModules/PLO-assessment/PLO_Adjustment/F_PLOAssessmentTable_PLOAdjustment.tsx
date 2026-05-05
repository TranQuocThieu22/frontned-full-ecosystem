import { service_COEPLO } from '@/api/services/service_COEPLO';
import { COEPLO } from '@/interfaces/shared-interfaces/COEPLO';
import { PLOProfiencyEnum, PLOProfiencyEnumLabel } from '@/shared/constants/enum/PLOProfiency';
import { CustomButtonPrintPDF } from '@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF';
import { CustomColumnDef } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn';
import { CustomDataTableAPI } from '@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils';
import { excelUtils } from '@aq-fe/core-ui/shared/utils/excelUtils';
import { Group, Table, Text } from '@mantine/core';
import { useMemo } from 'react';
import F_PLOAssessmentCreate from '../F_PLOAssessmentCreate';
import F_PLOAssessmentDelete_PLOAdjustment from './F_PLOAssessmentDelete_PLOAdjustment';
import F_PLOAssessmentUpdate_PLOAdjustment from './F_PLOAssessmentUpdate_PLOAdjustment';

enum Proficiency {
    "Kiến thức" = 1,
    "Kỹ năng" = 2,
    "Năng lực tự chủ và trách nhiệm" = 3
}

export default function F_PLOAssessmentTable_PLOAdjustment({ id, name }: { id: number, name: string }) {
    const queryPLO = useCustomReactQuery({
        queryKey: ["F_lz8rrabyws_PLO_Adjustment", id],
        axiosFn: async () => {
            // const result = await baseAxios.get<CustomApiResponse<ICoePLO[]>>(`/COEPLO/GetCOEPLOByGrade?COEGradeId=${id}`)
            const result = await service_COEPLO.getCOEPLOByGrade({ coeGradeId: id })
            return result
        },
        // refetchOnWindowFocus: false,
    });

    const chuanDauRaPLOColumns = useMemo<CustomColumnDef<COEPLO>[]>(
        () => [
            {
                header: "Mã PLO",
                accessorKey: "code",
                accessorFn: (row) => row.code,
                importFieldProps: {
                    isRequired: true,
                },
                size: 80
            },
            {
                header: "Tỷ trọng PLO (%)",
                accessorKey: "densityPLO",
                accessorFn: (row) => `${row.densityPLO}%`,
                importFieldProps: {
                    parseType: "number"
                },
                size: 80
            },
            {
                header: "Ngưỡng đạt (%)",
                accessorKey: "passedDensity",
                accessorFn: (row) => `${row.passedDensity ?? 0}%`,
                importFieldProps: {
                    parseType: "number"
                },
                size: 80
            },
            {
                header: "Mô tả",
                accessorKey: "description",
                accessorFn: (row) => row.description,
                importFieldProps: {},
                size: 480
            },
            {
                header: "Năng lực người học",
                accessorKey: "proficiency",
                accessorFn: (row) => {
                    if (!row.proficiency) return "Chưa có dữ liệu"
                    return Proficiency[row.proficiency]
                },
                importFieldProps: {
                    parseType: "number"
                },
            },

        ],
        []
    );

    const contentToPrint = () => (
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
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Tỷ trọng</Table.Th>
                        <Table.Th ta="center" style={{ border: "1px solid black", padding: '8px' }}>Mô tả CĐR</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {queryPLO.data?.map((item) => (
                        <Table.Tr key={item.id} style={{ border: "1px solid black" }}>
                            <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.code}</Table.Td>
                            <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.densityPLO}%</Table.Td>
                            <Table.Td ta="center" style={{ border: "1px solid black", padding: '8px' }}>{item.description}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </CustomFlexColumn>
    )

    if (queryPLO.isLoading) return "Đang tải dữ liệu..."
    if (queryPLO.isError) return "Không có dữ liệu..."
    return (
        <CustomDataTableAPI
            enableRowSelection={true}
            columns={chuanDauRaPLOColumns}
            enableRowNumbers={true}
            query={queryPLO}
            exportProps={{
                fileName: "Danh sách Chi tiết chuẩn đầu ra chương trình đào tạo (PLO)",
            }}
            deleteListFn={service_COEPLO.deleteListIds}
            buttonImportProps={{
                fileName: "Mẫu import danh sách Chi tiết chuẩn đầu ra chương trình đào tạo (PLO)",
                onSubmit: (data) => {
                    return service_COEPLO.createList(data.map(item => ({
                        ...item,
                        coeGradeId: id,
                    })))
                },
                onPrepareWorkbook: (workbook) => {
                    excelUtils.addSheet({
                        workbook, config: [
                            {
                                fieldKey: "value",
                                fieldName: "Mã",
                            },
                            {
                                fieldKey: "label",
                                fieldName: "Năng lực người học",
                            },

                        ],
                        data: converterUtils.mapEnumToSelectData(PLOProfiencyEnum, PLOProfiencyEnumLabel) || [],
                        sheetName: "Loại Năng lực người học"
                    })
                },
            }}
            renderTopToolbarCustomActions={() =>
                <>
                    <Group m={5}>
                        <F_PLOAssessmentCreate id={id} />
                        {/* <PrototypeImportButton/>
                    <PrototypeExportButton/>
                    <PrototypeDeleteAllButton/> */}
                        <CustomButtonPrintPDF>
                            {contentToPrint()}
                        </CustomButtonPrintPDF>
                    </Group>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <F_PLOAssessmentUpdate_PLOAdjustment data={row.original} />
                        <F_PLOAssessmentDelete_PLOAdjustment id={row.original.id!} code={row.original.code!} />
                    </CustomCenterFull>
                );
            }}
        />
    )
}

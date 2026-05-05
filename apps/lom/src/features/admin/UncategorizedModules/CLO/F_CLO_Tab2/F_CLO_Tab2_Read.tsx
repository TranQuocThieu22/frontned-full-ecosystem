'use client'

import { service_COECG } from "@/api/services/service_COECG";
import { service_COECLO } from "@/api/services/service_COECLO";
import { COECLO } from "@/interfaces/shared-interfaces/COECLO";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Text } from "@mantine/core";
import { useMemo } from "react";
import F_CLO_Tab2_Create from "./F_CLO_Tab2_Create";
import F_CLO_Tab2_Delete from "./F_CLO_Tab2_Delete";
import F_CLO_Tab2_Print from "./F_CLO_Tab2_Print";
import F_CLO_Tab2_Update from "./F_CLO_Tab2_Update";

export default function F_CLO_Tab2_Read({ coegradeSubjectId: coeGradeSubjectId }: { coegradeSubjectId?: number }) {

    const cloQuery = useCustomReactQuery({
        queryKey: [`CLOsBySubject`, coeGradeSubjectId],
        axiosFn: async () => {

            // const response = await baseAxios.get(`/COECLO/GetSource?COEGradeSubjectId=${coegradeSubjectId}`)
            const result = await service_COECLO.getSource({ COEGradeSubjectId: coeGradeSubjectId ?? 0 })
            return result;
        },
        options: {
            enabled: !!coeGradeSubjectId
        }
    });

    const cgQuery = useCustomReactQuery({
        queryKey: [`F_upgwbnmsn8_Tab2_COECG_ByGradeSubjectId=${coeGradeSubjectId}`],
        axiosFn: async () => {

            // const response = await baseAxios.get(`/COECG/GetSource?COEGradeSubjectId=${coeGradeSubjectId}`);
            const result = await service_COECG.getSource({
                COEGradeSubjectId: coeGradeSubjectId ?? 0
            })
            return result;
        },
        options: {
            enabled: !!coeGradeSubjectId,
        }
    });

    const totalCLO = useMemo(() => {
        return cloQuery.data?.reduce((acc, curr) => acc + (curr.densityCLO ?? 0), 0) ?? 0;
    }, [cloQuery.data]);

    const columns = useMemo<CustomColumnDef<COECLO>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "coecgcode",
            accessorFn: row => row.coecg.code,
            importFieldProps: { isRequired: true },
            size: 100,
        },
        {
            header: "Mã CLO",
            accessorKey: "code",
            importFieldProps: { isRequired: true },
            size: 100,
        },
        {
            header: "Tỷ trọng CLO",
            accessorKey: "densityCLO",
            accessorFn: (row) => `${(row.densityCLO ?? 0)}%`,
            importFieldProps: { parseType: "number" },
            size: 80,
        },
        {
            header: "Ngưỡng đạt (%)",
            accessorKey: "passedDensity",
            accessorFn: (row) => `${row.passedDensity ?? 0}%`,
            importFieldProps: { parseType: "number" },
            size: 80,
        },
        // {
        //     header: "PIs",
        //     accessorKey: "coeclo",
        //     accessorFn: (row) => row.coeclopi?.map((pi) => pi.coepi?.code).join(", "),
        // },
        {
            header: "Mô tả CLO",
            accessorKey: "description",
            importFieldProps: {},
            size: 560,

        },
    ], [coeGradeSubjectId, cloQuery]);

    if (cloQuery.isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (cloQuery.isError) return <Text>Không có dữ liệu...</Text>;
    if (!coeGradeSubjectId) return <Text>Vui lòng chọn môn học</Text>;

    return (
        <CustomDataTableAPI
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns}
            query={cloQuery}
            exportProps={{
                fileName: "Danh sách Chuẩn đầu ra môn học (CLO)"
            }}
            deleteListFn={service_COECLO.deleteListIds}
            buttonImportProps={{
                fileName: "Mẫu import danh sách Chuẩn đầu ra môn học (CLO)",
                onSubmit: (data) => {
                    if (!coeGradeSubjectId) {
                        utils_notification_show({
                            crudType: "error",
                            message: "Lỗi không tìm thấy môn học, vui lòng kiểm tra lại"
                        })
                        return
                    }
                    return service_COECLO.importCLOByCode(data.map(item => ({
                        code: item.code,
                        cgcode: item.coecgcode,
                        description: item.description,
                        coeGradeSubjectId: coeGradeSubjectId,
                        densityCLO: item.densityCLO,
                        passedDensity: item.passedDensity
                    })))
                },
                onPrepareWorkbook: (workbook) => {
                    excelUtils.addSheet({
                        workbook, config: [
                            {
                                fieldKey: "code",
                                fieldName: "Mã CG",
                            },
                            {
                                fieldKey: "description",
                                fieldName: "Mô tả CG",
                            },

                        ],
                        data: cgQuery.data ?? [],
                        sheetName: "Danh sách CG"
                    })
                },
            }}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F_CLO_Tab2_Create coegradeSubjectId={coeGradeSubjectId} totalCLO={totalCLO} />
                    <F_CLO_Tab2_Print data={cloQuery.data!} />
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <F_CLO_Tab2_Update data={row.original} totalCLO={totalCLO} />
                        <F_CLO_Tab2_Delete id={row.original.id!} code={row.original.code!} />
                    </CustomCenterFull>
                );
            }}
        />
    );
}

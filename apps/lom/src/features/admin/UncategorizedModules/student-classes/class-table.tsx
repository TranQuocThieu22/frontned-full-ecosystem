'use client'
import { ClassService } from "@/api/services/ClassService";
import { service_COEGrade } from "@/api/services/service_COEGrade";
import { canCreateClassData, canUpdateClassData } from "@/features/auth/PageAuthorization/class-data.auth";
import { Class } from "@/interfaces/shared-interfaces/Class";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { classService } from "@aq-fe/core-ui/shared/APIs/classService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useMemo } from "react";
import ClassCreateUpdateButton from "./class-create-update-button";
import ClassSyncButton from "./class-sync-button";


export default function ClassTable() {
    const authenticateStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const gradeQuery = useCustomReactQuery({
        queryKey: ["EnrollmentBatchs"],
        axiosFn: () => service_COEGrade.getAll(),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const classesQuery = useCustomReactQuery({
        queryKey: ["Classes"],
        axiosFn: () => ClassService.getAll({
            cols: ["COEGrade", "Users"]
        }),
        options: {
            refetchOnWindowFocus: false
        }
    })

    const classColumns = useMemo<CustomColumnDef<Class>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
            importFieldProps: {}
        },
        {
            header: "Tên lớp",
            accessorKey: "name",
            importFieldProps: {
                isRequired: true,
            }
        },
        {
            header: "Tên lớp Eg",
            accessorKey: "egName",
            importFieldProps: {
                isRequired: true,
            }
        },
        {
            header: "Mã khóa",
            accessorKey: "gradeCode",
            importFieldProps: {
                isRequired: true
            },
            accessorFn: (row) => row.coeGrade?.code
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            importFieldProps: {}
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách lớp">
            <CustomDataTableAPI
                query={classesQuery}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={classColumns}
                exportProps={{
                    fileName: "Danh sách lớp",
                }}
                buttonImportProps={{
                    onSubmit: (finalValues) => ClassService.import(finalValues.map((item: Class) => {
                        return {
                            code: item.code,
                            name: item.name,
                            egName: item.egName,
                            gradeCode: item.gradeCode,
                            note: item.note
                        }
                    })),
                    fileName: "Mẫu import danh sách lớp",
                    onPrepareWorkbook: (workbook) => {
                        if (gradeQuery.data && gradeQuery.data.length > 0) {
                            const gradeReferenceData: any[] = [];

                            gradeQuery.data.forEach((grade: COEGrade) => {
                                gradeReferenceData.push({
                                    gradeCode: grade?.code || "",
                                    gradeName: grade?.name || "",
                                });
                            });

                            const gradeReferenceConfig: IExcelColumnConfig<any>[] = [
                                { fieldKey: "gradeCode", fieldName: "Mã khóa", isRequired: false },
                                { fieldKey: "gradeName", fieldName: "Tên khóa", isRequired: false },
                            ];

                            excelUtils.addSheet<any>({
                                workbook: workbook,
                                sheetName: "Danh sách khóa",
                                data: gradeReferenceData,
                                config: gradeReferenceConfig,
                            });
                        }
                    }
                }}
                deleteFn={classService.delete}
                deleteListFn={classService.deleteListIds}
                renderTopToolbarCustomActions={() => (
                    <>
                        {canCreateClassData(authenticateStore, userPermissionStore) && <ClassCreateUpdateButton loading={classesQuery.isLoading} />}
                        {canUpdateClassData(authenticateStore, userPermissionStore) && <ClassSyncButton loading={classesQuery.isLoading} />}
                    </>
                )}
                renderRowActions={({ row }) => (
                    <>
                        {canUpdateClassData(authenticateStore, userPermissionStore) && <ClassCreateUpdateButton loading={classesQuery.isLoading} data={row.original} />}
                    </>
                )}
            />
        </CustomFieldset>
    );
}


"use client"


import { service_COEGradeSubject } from "@/api/services/service_COEGradeSubject";
import { canUpdateCLOData } from '@/features/auth/PageAuthorization/clo-data.auth';
import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useMemo } from 'react';
import F_CLO_Read_Update from './F_CLO_Read_Update';
import useS_CLO from './useS_CLO';

export interface IProgram {
    note?: string;
    coeUnitId?: number;
    coeUnit?: any;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface IGradeByProgram {
    coeSemesterStartId?: number;
    coeSemesterEndId?: number;
    coeTrainingLevelId?: number;
    coeProgramId?: number;
    note?: string;
    coeSemesterStart?: any;
    coeSemesterEnd?: any;
    coeTrainingLevel?: any;
    coeProgram?: any;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface IF_upgwbnmsn8_Read {
    id?: number;
    code?: string;
    name?: string;
    coeGradeSubjectId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    activityPlanId?: number | null;
    coeSubjectGroupId?: number;
    order?: number;
    coeGradeSubject?: any;
    coeSubject?: any;
    coeSemester?: any;
    activityPlan?: any;
    coeSubjectGroup?: any;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function F_CLO_Table() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const store = useS_CLO();

    const subjectByGradeQuery = useCustomReactQuery({
        options: {
            enabled: !!store.state.gradeId,
            refetchOnWindowFocus: false,
            select: (data) => data.sort((subjectA, subjectB) => (subjectA.order ?? 0) - (subjectB.order ?? 0))
        },
        queryKey: [`F_upgwbnmsn8_Read_COEGradeSubject_GetSubjectByGrade`, store.state.gradeId],
        axiosFn: async () => {
            let cols = 'COESubject,ActivityPlan'
            // const response = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade/?COEGradeID=${store.state.gradeId}&cols=${cols}`);
            const result = await service_COEGradeSubject.getSubjectByGrade({
                COEGradeId: store.state.gradeId,
                cols: cols
            })
            return result;
        },

    });

    const columns = useMemo<CustomColumnDef<COEGradeSubject>[]>(() => [
        { header: "Năm học Học kỳ", accessorKey: "activityPlan.name" },
        { header: "Thứ tự", accessorKey: "order", size: 80 },
        { header: "Mã môn học", accessorKey: "coeSubject.code" },
        { header: "Tên môn học", accessorKey: "coeSubject.name" },
        { header: "Số tín chỉ", accessorKey: "coeSubject.numberCredit", size: 100 },
        { header: "Số tiết", accessorKey: "coeSubject.numberPeriod", size: 100 },
        {
            header: "CLO",
            accessorFn: (originalRow) => {
                if (canUpdateCLOData(userStore, userPermissionStore)) {
                    return <F_CLO_Read_Update
                        data={originalRow}
                        coeGradeSubjectId={originalRow?.id ?? 0}
                    />
                }
                else return null
            }
        }
    ], [userPermissionStore, userStore]);

    return (
        <CustomFlexColumn gap="lg">
            <CustomFieldset
                title="Danh sách môn học thuộc CTĐT">
                <CustomDataTableAPI
                    initialState={{
                        columnPinning: {
                            right: ['CLO'], //pin built-in row actions display column to right by default
                        },
                    }}
                    // state={{
                    //     isLoading: subjectByGradeQuery.isLoading,
                    // }} 
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    exportProps={{
                        fileName: "Danh sách môn học thuộc CTĐT"
                    }}
                    columns={columns}
                    query={subjectByGradeQuery}
                />
            </CustomFieldset>
        </CustomFlexColumn>
    );
}
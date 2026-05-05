'use client'
import { service_studentActivityPlan } from '@/api/services/service_studentActivityPlan';
import { StudentActivityPlan } from '@/interfaces/StudentActivityPlan';
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { service_account } from '../../../../api/services/service_account';
import SemesterStudentSyncButton from './SemesterStudentSyncButton';
import SemesterStudentListCreate from "./SemesterStudentListCreate";
import SemesterStudentListDelete from './SemesterStudentListDelete';
import SemesterStudentListExport from './SemesterStudentListExport';
import SemesterStudentListUpdate from './SemesterStudentListUpdate';
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { genderEnum, genderLabel } from '@aq-fe/core-ui/shared/consts/enum/genderEnum';
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
export default function SemesterStudentListRead() {
    const [importData, setImportData] = useState(false);
    const activityStore = useS_Shared_ActivityPlan()

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const disc = useDisclosure()
    const titleState = useState<string>("")


    const mutation = useCustomReactMutation({
        axiosFn: () =>
            service_account.AQDataStudent(
                {
                    "filter": {
                        "is_tieng_anh": false,
                        "hoc_ky": Number(activityStore.state.ActivityPlan?.code),
                        "ten_ham": "HamMacDinh",
                        "ten_bien": "BienMacDinh",
                        "is_giua_ky": false,
                        "is_mobile": false
                    },
                    "additional": {
                        "paging": {
                            "limit": 20000,
                            "page": 1
                        },
                        "ordering": [
                            {
                                "name": "ma_sinh_vien",
                                "order_type": 1
                            }
                        ],
                        "isLimit": false
                    }
                }
            ),
        options: {
            retry: 0,
            onSuccess: (data: string) => {

                titleState[1](data)
                disc[1].open()
            }
        }
    });
    const activityPlanStore = useS_Shared_ActivityPlan()
    const storePermission = usePermissionStore()

    const Q_StudentList = useCustomReactQuery({
        queryKey: ["service_studentActivityPlan", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: async () => {
            return await service_studentActivityPlan.findbyActivityPlan({
                activityPlanId: activityPlanStore.state.ActivityPlan?.id
            })

        },
        options: {
            refetchInterval: false
        }
    })

    const columns = useMemo<MRT_ColumnDef<StudentActivityPlan>[]>(() => [
        {
            accessorKey: 'user.code',
            header: 'Mã sinh viên',
            size: 200
        },
        {
            accessorKey: 'user.fullName',
            header: 'Họ tên',
        },
        {
            accessorKey: 'user.gender',
            header: 'Giới tính',
            size: 160,
            Cell: ({ cell }) => {
                const value = cell.getValue<number>();
                return value === genderEnum.Male ? genderLabel[1] : genderLabel[2];
            }
        },
        {
            accessorKey: 'dateOfBirth',
            header: 'Ngày sinh',
            size: 180,
            accessorFn(originalRow) {
                if (!originalRow.user?.dateOfBirth) return ''
                return dateUtils.toDDMMYYYY(new Date(originalRow.user?.dateOfBirth ?? ''));
            },
        },
        {
            accessorKey: 'isEnabled',
            header: 'Trạng thái',
            size: 160,
        },
        {
            accessorKey: 'user.className',
            header: 'Tên lớp',
        },
        {
            accessorKey: 'subLecturerCode',
            header: 'Mã cố vấn học tập',
            size: 200,
        },
        {
            accessorKey: 'lecturerCode',
            header: 'Mã giáo viên chủ nhiệm',
            size: 220,
        },
        {
            // accessorKey: 'major.code',
            header: 'Mã khối',
            size: 140,
        },
        // {
        //     accessorKey: 'user.majorsCode',
        //     header: 'Mã ngành',
        //     size: 140,
        // },
        {
            accessorKey: 'user.majorsName',
            header: 'Tên ngành',
            size: 160,
        },
        {
            accessorKey: 'user.facultyCode',
            header: 'Mã khoa',
            size: 140,
        },

    ], [])

    return (
        <CustomFieldset title={`Danh sách`}>
            <CustomDataTable
                isLoading={Q_StudentList.isLoading}
                isError={Q_StudentList.isError}
                columns={columns}
                data={Q_StudentList.data ?? []}
                enableRowSelection={true}
                enableRowNumbers={false}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table.getSelectedRowModel().flatRows.map((item) => item.original) ||
                        [];

                    return <>
                        <SemesterStudentListCreate />
                        {storePermission.state?.currentPermissionPage?.isCreate && <CustomButton
                            actionType='import'
                            // setImportedData={setImportData}
                            // form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Import
                        </CustomButton>}
                        {storePermission.state?.currentPermissionPage?.isExport && <SemesterStudentListExport data={Q_StudentList.data ?? []} />}
                        <CustomButtonDeleteList
                            onSubmit={() => service_studentActivityPlan.deleteList(selectedRows.map((item) => ({
                                id: item.id,
                                code: item.user?.code,
                                name: item.user?.fullName,
                                isEnabled: item.isEnabled,
                            } as BaseEntity)))}
                            contextData={selectedRows.map((item) => item.user?.code).join(", ")}
                        />
                        <SemesterStudentSyncButton
                            disclosure={disc}
                            onStartSync={() => mutation.mutate()}
                            isLoading={mutation.isPending}
                            title={titleState[0]} />
                    </>
                }}
                renderRowActions={({ row }) => {
                    return <CustomCenterFull>
                        <SemesterStudentListUpdate values={row.original} />
                        <SemesterStudentListDelete code={row.original.user?.code ?? ''} id={row.original.id!} />
                    </CustomCenterFull>
                }}
            />
        </CustomFieldset>
    );
}


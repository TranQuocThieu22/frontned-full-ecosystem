"use client"
import { DeleteActionIcon } from '@/components/crud/DeleteActionIcon';
import DeletePrompt from '@/components/crud/DeletePrompt';
import { UpdateActionIcon } from '@/components/crud/UpdateActionIcon';
import { showGeneralErrorNotification, showGeneralSuccessNotification } from '@/components/domain/ModuleNotification/CommonNotification';
import { MyDataTable } from '@/components/ui/DataDisplay/DataTable/MyDataTable';
import { AppPage } from '@/data/enum/app-page.enum';
import { canCreateSubject, canDeleteSubject, canUpdateSubject } from '@/features/auth/PageAuthorization/subject.auth';
import SyncDataEdusoftButton from '@/shared/components/SyncDataEdusoftButton';
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { AQDataSynchronizationService } from '@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { DepartmentInfoViewModel } from '../Department/department-table';
import SubjectForm from './subject-form';

interface Props {
    appPage: number;
    onClickSelectSubjectButton?: (subject: SubjectInfoViewModel) => void;
}

export interface SubjectInfoViewModel {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled: boolean;
    nameEg?: string | null;
    numberPeriod?: number | null;
    numberCredit?: number | null;
    note?: string | null;
    departmentId?: number | null;
    department?: DepartmentInfoViewModel | null;
    modifiedWhen?: Date | null;
    modifiedBy?: number | null;
    modifiedFullName?: string | null;
}

export default function SubjectTable({ appPage, onClickSelectSubjectButton }: Props) {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const defaultSubjectData = {
        id: 0,
        code: null,
        name: null,
        concurrencyStamp: 'string',
        isEnabled: true,
        nameEg: null,
        numberPeriod: null,
        numberCredit: null,
        note: null,
        departmentId: null,
    }
    const [currentSubjectData, setCurrentSubjectData] = useState<SubjectInfoViewModel>(defaultSubjectData);
    const [subjectFormOpened, subjectFormHandler] = useDisclosure(false);
    const [subjectDeletePromptOpened, subjectDeletePromptHandler] = useDisclosure(false);

    const subjectQuery = useQuery<SubjectInfoViewModel[]>({
        queryKey: [`Subjects`],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubject/GetAll?cols=Department");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<SubjectInfoViewModel>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "code"
        },
        {
            header: "Tên môn học",
            accessorKey: "name"
        },
        {
            header: "Số tiết",
            accessorKey: "numberPeriod"
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "department.name",
        },
    ], []);

    const openSubjectForm = (subjectData: SubjectInfoViewModel) => {
        setCurrentSubjectData(subjectData);
        subjectFormHandler.open();
    }

    const deleteSubjectMutation = useMutation({
        mutationFn: async (currentSubjectData: SubjectInfoViewModel) => {
            let body = {
                id: currentSubjectData?.id,
                isEnabled: false
            }
            let response = await baseAxios.post('/COESubject/Delete', body)
            if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            subjectQuery.refetch();
            subjectDeletePromptHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const openDeleteSubjectPrompt = (subjectData: SubjectInfoViewModel) => {
        setCurrentSubjectData(subjectData);
        subjectDeletePromptHandler.open();
    }

    return (
        <CustomFlexColumn>
            <MyDataTable
                columns={columns}
                data={subjectQuery.data ?? []}
                initialState={{
                    pagination: { pageSize: appPage === AppPage.CurriculumSetup ? 10 : 30, pageIndex: 0 },
                }}
                enableRowSelection={appPage === AppPage.SubjectData}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                {appPage === AppPage.SubjectData &&
                                    canCreateSubject(userStore, userPermissionStore) &&
                                    <Button onClick={() => openSubjectForm(defaultSubjectData)} leftSection={<IconPlus />}>Thêm</Button>
                                }
                                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataSubject()} />
                            </Group>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            {
                                appPage === AppPage.SubjectData ?
                                    <>
                                        {canUpdateSubject(userStore, userPermissionStore) && <UpdateActionIcon actionIconProps={{ onClick: () => openSubjectForm(row.original) }} />}
                                        {canDeleteSubject(userStore, userPermissionStore) && <DeleteActionIcon actionIconProps={{ onClick: () => openDeleteSubjectPrompt(row.original) }} />}
                                    </>
                                    :
                                    appPage === AppPage.CurriculumSetup ?
                                        <Button onClick={() => onClickSelectSubjectButton && onClickSelectSubjectButton(row.original)}>Chọn</Button>
                                        :
                                        <></>
                            }
                        </CustomCenterFull>
                    )
                }}
            />
            <Modal
                size={'lg'}
                opened={subjectFormOpened}
                onClose={subjectFormHandler.close}
                title={<Text fw={700}>Thông tin môn học</Text>}
            >
                <SubjectForm subjectData={currentSubjectData} formHandler={subjectFormHandler} />
            </Modal>

            <DeletePrompt
                onConfirm={() => deleteSubjectMutation.mutate(currentSubjectData)}
                target={{
                    label: "môn học",
                    code: currentSubjectData.code,
                    name: currentSubjectData.name
                }}
                modalProps={{
                    opened: subjectDeletePromptOpened,
                    onClose: subjectDeletePromptHandler.close
                }}
            />
        </CustomFlexColumn>
    )
}

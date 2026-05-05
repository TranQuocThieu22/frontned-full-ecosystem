// CandidateList.tsx

import { IExamSection, examSectionService } from '@/shared/APIs/examSectionService';
import { genderEnum, genderLabel } from '@aq-fe/core-ui/shared/consts/enum/genderEnum';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
    AQButtonCreateByImportFile,
    MyButton,
    MyButtonModal,
    MyCenterFull,
    MyDataTable,
    MyFieldset,
} from 'aq-fe-framework/components';
import { useMyReactQuery } from 'aq-fe-framework/hooks';
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import CandidateDelete from '././CandidateDelete';
import CandidateCreate from './CandidateCreate';
import CandidateDeleteList from './CandidateDeleteList';
import CandidateUpdate from './CandidateUpdate';
import ExamSectionInfo from './ExamSection/ExamSectionInfo';

interface PendingChanges {
    toAdd: any[];
    toUpdate: any[];
    toDelete: any[];
}

export default function CandidateList({ data }: { data: IExamSection }) {
    const disc = useDisclosure();

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const candidatesQuery = useMyReactQuery({
        queryKey: ['candidatesQuery', data.id],
        axiosFn: async () => examSectionService.GetStudentsOfExamSectionByExamSectionId(data.id || 0),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false,
        },
    });

    // UI data - what's displayed in the table
    const [candidatesData, setCandidatesData] = useState<any[]>([]);

    // Pending changes - what will be sent to APIs
    const [pendingChanges, setPendingChanges] = useState<PendingChanges>({
        toAdd: [],
        toUpdate: [],
        toDelete: []
    });

    useEffect(() => {
        if (candidatesQuery.data) {
            const withIsEnable = candidatesQuery.data.map((item: any) => ({
                ...item,
                isEnable: true,
            }));
            setCandidatesData(withIsEnable);
        }
    }, [candidatesQuery.data]);

    const isFromAPI = (candidate: any) => {
        return typeof candidate.id === 'number' || candidate.id.toString().startsWith('api_');
    };

    const isNewlyAdded = (code: string) => {
        return pendingChanges.toAdd.some(c => c.code === code);
    };

    const handleAddCandidate = (newCandidate: any) => {
        const candidateToAdd = {
            ...newCandidate,
            isEnable: true,
        };

        // Add to UI data
        setCandidatesData((prevData) => [...prevData, candidateToAdd]);

        // Add to pending changes
        setPendingChanges(prev => ({
            ...prev,
            toAdd: [...prev.toAdd, candidateToAdd]
        }));
    };

    const handleUpdateCandidate = (updatedCandidate: any) => {
        // Update UI data
        setCandidatesData((prevData) =>
            prevData.map((candidate) =>
                candidate.code === updatedCandidate.code ? { ...updatedCandidate, isEnable: true } : candidate
            )
        );

        // Handle pending changes based on candidate origin
        if (isNewlyAdded(updatedCandidate.code)) {
            // If it's a newly added candidate, update it in the toAdd array
            setPendingChanges(prev => ({
                ...prev,
                toAdd: prev.toAdd.map(c =>
                    c.code === updatedCandidate.code ? updatedCandidate : c
                )
            }));
        } else {
            // If it's from API, add to toUpdate (remove existing update for same candidate if exists)
            setPendingChanges(prev => ({
                ...prev,
                toUpdate: [
                    ...prev.toUpdate.filter(c => c.code !== updatedCandidate.code),
                    updatedCandidate
                ]
            }));
        }
    };

    const handleDeleteCandidate = (code: string) => {
        const candidateToDelete = candidatesData.find(c => c.code === code);

        // Update UI data
        setCandidatesData((prevData) =>
            prevData
                .map((candidate) => {
                    if (candidate.code !== code) return candidate;
                    if (isFromAPI(candidate)) return { ...candidate, isEnable: false };
                    return null;
                })
                .filter(Boolean)
        );

        // Handle pending changes based on candidate origin
        if (isNewlyAdded(code)) {
            // If it's a newly added candidate, remove from toAdd list
            setPendingChanges(prev => ({
                ...prev,
                toAdd: prev.toAdd.filter(c => c.code !== code)
            }));
        } else if (candidateToDelete && isFromAPI(candidateToDelete)) {
            // If it's from API, add to delete list and remove from update list
            setPendingChanges(prev => ({
                ...prev,
                toDelete: [...prev.toDelete, candidateToDelete],
                toUpdate: prev.toUpdate.filter(c => c.code !== code)
            }));
        }
    };

    const handleDeleteCandidates = (codes: string[]) => {
        const candidatesToDelete = candidatesData.filter(c => codes.includes(c.code));

        // Update UI data
        setCandidatesData((prevData) =>
            prevData
                .map((candidate) => {
                    if (!codes.includes(candidate.code)) return candidate;
                    if (isFromAPI(candidate)) return { ...candidate, isEnable: false };
                    return null;
                })
                .filter(Boolean)
        );

        // Separate candidates by their origin
        const newlyAddedCodes: string[] = [];
        const apiCandidateCodes: string[] = [];

        candidatesToDelete.forEach(candidate => {
            if (isNewlyAdded(candidate.code)) {
                newlyAddedCodes.push(candidate.code);
            } else if (isFromAPI(candidate)) {
                apiCandidateCodes.push(candidate.code);
            }
        });

        setPendingChanges(prev => ({
            ...prev,
            toDelete: [...prev.toDelete, ...candidatesToDelete.filter(c => isFromAPI(c))],
            toAdd: prev.toAdd.filter(c => !newlyAddedCodes.includes(c.code)),
            toUpdate: prev.toUpdate.filter(c => !apiCandidateCodes.includes(c.code))
        }));
    };

    const handleImportSubmit = () => {
        const newImportedCandidates = form_multiple.values.importedData.map((item: any) => ({
            ...item,
            id: `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            code: item.code || `imported_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            dateOfBirth: item.Date_of_Birth ? new Date(item.Date_of_Birth) : null,
            gender: item.Gender,
            EVAClassId: item.Class,
            email: item.Email,
            phoneNumber: item.PhoneNumber,
            fullName: item.Full_Name,
            isEnable: true,
        }));

        // Add to UI data
        setCandidatesData((prevData) => [...prevData, ...newImportedCandidates]);

        // Add to pending changes
        setPendingChanges(prev => ({
            ...prev,
            toAdd: [...prev.toAdd, ...newImportedCandidates]
        }));
    };

    const handleSaveAllChanges = async () => {
        console.log('Pending changes:', pendingChanges);

        try {
            // Handle additions
            if (pendingChanges.toAdd.length > 0) {
                const candidate = pendingChanges.toAdd[0];

                const addBody = {
                    evaExamSectionId: data.id,
                    userId: candidate.id,
                    enrollPassword: candidate.enrollPassword || '',
                };
                console.log('Adding candidates:', addBody);
                await examSectionService.AddStudentToExamSection(addBody);
            }

            // Handle updates
            if (pendingChanges.toUpdate.length > 0) {
                const updateBody = pendingChanges.toUpdate.map((candidate) => ({
                    // id: candidate.id,
                    userId: candidate.id,
                    evaExamSectionId: data.id,
                    enrollPassword: candidate.enrollPassword || '',
                    // isEnable: candidate.isEnable !== false,
                }));
                console.log('Updating candidates:', updateBody);
                await examSectionService.UpdateStudentExamSectionEnrollPasswords(updateBody);
            }

            // Handle deletions
            if (pendingChanges.toDelete.length > 0) {
                const deleteBody = pendingChanges.toDelete.map((candidate) => ({
                    // id: candidate.id,
                    evaExamSectionId: data.id,
                    userId: candidate.id,
                    // enrollPassword: candidate.enrollPassword || '',
                    // isEnable: candidate.isEnable !== false,
                }));
                console.log('Deleting candidates:', deleteBody);
                await examSectionService.DeleteStudentsFromExamSection(deleteBody);
            }

            // Clear pending changes after successful save
            setPendingChanges({
                toAdd: [],
                toUpdate: [],
                toDelete: []
            });

            utils_notification_show({ crudType: 'create', message: 'Lưu dữ liệu thành công' });
            candidatesQuery.refetch();
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu thí sinh:', error);
            alert('Đã có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.');
        }
    };

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            { header: 'Mã thí sinh', accessorKey: 'code' },
            { header: 'Họ tên', accessorKey: 'fullName' },
            {
                header: 'Ngày sinh',
                accessorKey: 'dateOfBirth',
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.dateOfBirth)),
            },
            {
                header: 'Giới tính',
                accessorKey: 'gender',
                accessorFn: (row) => genderLabel[row.gender as genderEnum],
            },
            { header: 'Lớp', accessorKey: 'EVAClassId' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Số điện thoại', accessorKey: 'phoneNumber' },
            {
                header: 'Mật khẩu',
                accessorKey: 'password',
                accessorFn: (row) => (row.code ? '*'.repeat(row.code.length) : '*******'),
            },
        ],
        []
    );

    const hasPendingChanges = pendingChanges.toAdd.length > 0 ||
        pendingChanges.toUpdate.length > 0 ||
        pendingChanges.toDelete.length > 0;

    return (
        <MyButtonModal disclosure={disc} title="Chi tiết Danh sách thí sinh" label="Danh sách" modalSize={'80%'}>
            <ExamSectionInfo data={data} />
            <MyFieldset title="Danh sách thí sinh">
                <MyDataTable
                    isLoading={candidatesQuery.isLoading}
                    isError={candidatesQuery.isError}
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    exportAble
                    data={candidatesData.filter((c) => c.isEnable !== false)}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <CandidateCreate
                                onAddCandidate={handleAddCandidate}
                                currentCandidates={candidatesData}
                                isModalOpened={disc[0]}
                            />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={handleImportSubmit}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <CandidateDeleteList
                                values={table.getSelectedRowModel().flatRows.map((item) => item.original)}
                                onDeleteCandidates={handleDeleteCandidates}
                            />
                        </Group>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <CandidateUpdate candidate={row.original} onUpdateCandidate={handleUpdateCandidate} />
                            <CandidateDelete code={row.original.code} onDeleteCandidate={handleDeleteCandidate} />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
            <MyButton
                crudType="save"
                onClick={handleSaveAllChanges}
                disabled={!hasPendingChanges}
            />
            {hasPendingChanges && (
                <div style={{ marginTop: 10, fontSize: '12px', color: '#666' }}>
                    Pending changes: {pendingChanges.toAdd.length} to add, {pendingChanges.toUpdate.length} to update, {pendingChanges.toDelete.length} to delete
                </div>
            )}
        </MyButtonModal>
    );
}